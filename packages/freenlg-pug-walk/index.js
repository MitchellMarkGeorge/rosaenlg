'use strict';

var debug = require('debug')('freenlg-pug-walk');

module.exports = walkAST;
function walkAST(ast, before, after, options) {
  if (after && typeof after === 'object' && typeof options === 'undefined') {
    options = after;
    after = null;
  }
  options = options || {includeDependencies: false};
  var parents = options.parents = options.parents || [];

  var replace = function replace(replacement) {
    if (Array.isArray(replacement) && !replace.arrayAllowed) {
      throw new Error('replace() can only be called with an array if the last parent is a Block or NamedBlock');
    }
    ast = replacement;
  };
  replace.arrayAllowed = parents[0] && (
    /^(Named)?Block$/.test(parents[0].type) ||
    parents[0].type === 'RawInclude' && ast.type === 'IncludeFilter');

  if (before) {
    var result = before(ast, replace);
    if (result === false) {
      return ast;
    } else if (Array.isArray(ast)) {
      // return right here to skip after() call on array
      return walkAndMergeNodes(ast);
    }
  }

  parents.unshift(ast);

  switch (ast.type) {
    case 'NamedBlock':
    case 'Block':
      ast.nodes = walkAndMergeNodes(ast.nodes);
      break;
    case 'Itemz':
      // debug('walk in Itemz');
      enrichItemz(ast);
      // debug(JSON.stringify(ast));
    case 'Synz':
      // debug('walk in Synz');
      enrichSynz(ast);
      // debug(JSON.stringify(ast));
    case 'Case':
    case 'Filter':
    case 'Mixin':
    case 'Tag':
    case 'InterpolatedTag':
    case 'Item':
    case 'Syn':
    case 'When':
    case 'Code':
    case 'Protect':
    case 'Choosebest':
    case 'Titlecase':
    case 'RecordSaid':
    case 'DeleteSaid':
    case 'While':
      if (ast.block) {
        ast.block = walkAST(ast.block, before, after, options);
      }
      break;
    case 'Eachz':
      if (ast.block) {
        ast.block = walkAST(ast.block, before, after, options);
      }
      break;
    case 'Each':
      if (ast.block) {
        ast.block = walkAST(ast.block, before, after, options);
      }
      if (ast.alternate) {
        ast.alternate = walkAST(ast.alternate, before, after, options);
      }
      break;
    case 'Conditional':
      if (ast.consequent) {
        ast.consequent = walkAST(ast.consequent, before, after, options);
      }
      if (ast.alternate) {
        ast.alternate = walkAST(ast.alternate, before, after, options);
      }
      break;
    case 'Include':
      walkAST(ast.block, before, after, options);
      walkAST(ast.file, before, after, options);
      break;
    case 'Extends':
      walkAST(ast.file, before, after, options);
      break;
    case 'RawInclude':
      ast.filters = walkAndMergeNodes(ast.filters);
      walkAST(ast.file, before, after, options);
      break;
    case 'Attrs':
    case 'BlockComment':
    case 'Comment':
    case 'Doctype':
    case 'IncludeFilter':
    case 'MixinBlock':
    case 'YieldBlock':
    case 'Text':
      break;
    case 'FileReference':
      if (options.includeDependencies && ast.ast) {
        walkAST(ast.ast, before, after, options);
      }
      break;
    default:
      throw new Error('Unexpected node type ' + ast.type);
      break;
  }

  parents.shift();

  after && after(ast, replace);
  return ast;

  function enrichItemz(ast) {
    var items = ast.block.nodes

    ast.size = items.length;

    for (var i=0; i<items.length; i++) {
      items[i].pos = i+1;
    }

  };

  // very close from enrichItemz, make it the same!
  function enrichSynz(ast) {
    var items = ast.block.nodes

    ast.size = items.length;

    var consolidated = [];
    for (var i=0; i<items.length; i++) {
      items[i].pos = i+1;

      // get each syn params at a higher level
      if (items[i].params) {
        consolidated.push(`${i+1}: ${items[i].params}`);
      }

    }
    if (consolidated.length>0) {
      ast.consolidated = consolidated.join(',');
    }

  };
  
  function walkAndMergeNodes(nodes) {
    return nodes.reduce(function (nodes, node) {
      var result = walkAST(node, before, after, options);
      if (Array.isArray(result)) {
        return nodes.concat(result);
      } else {
        return nodes.concat([result]);
      }
    }, []);
  }
}
