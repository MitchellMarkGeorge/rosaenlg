import { GenderNumberManager } from "./GenderNumberManager";
import { getConjugation as getConjugation_fr_FR } from "./VerbsManagerFrench";

import * as compromise from "compromise";

export class VerbsManager {
  language: string;
  genderNumberManager: GenderNumberManager;
  spy: Spy;

  constructor(params: any) {
    this.language = params.language;
    this.genderNumberManager = params.genderNumberManager;
  }
  

  getAgreeVerb(subject: any, verbInfo: string | any): string {
    if (this.spy.isEvaluatingEmpty()) {
      return 'SOME_VERB';
    } else {
  
      const verbName: string = typeof verbInfo === 'string' ? verbInfo : verbInfo.verb;
      if (verbName==null) { 
        console.log("ERROR: verb needed.");
        return '';
      }
  
      const tense: string = ( typeof verbInfo === 'string' || verbInfo.tense==null ) ? 'PRESENT' : verbInfo.tense;
      //console.log('verb=' + verbName + ' tense=' + tense + ' params: ' + JSON.stringify(verbInfo));
  
      const number: string = this.genderNumberManager.getRefNumber(subject, null);
      let person;
      if (number=='P') {
        person = 5;
      } else {
        person = 2;
      }
  
      return this.getConjugation(verbName, tense, person, typeof verbInfo === 'string' ? null : verbInfo);
    }
  }
  
  
  
  getConjugation(verb: string, tense: string, person: number, verbInfo: any): string {
    switch (this.language) {
      case 'en_US':
        return this.getConjugation_en_US(verb, tense, person, verbInfo);
      case 'fr_FR':
        var params:any = {};
        if (verbInfo!=null && verbInfo.pronominal==true) {
          params.pronominal = true;
        }
        if (verbInfo!=null && verbInfo.aux!=null) {
          params.aux = verbInfo.aux;
        }

        if (verbInfo!=null && verbInfo.agree!=null) {
          params.gender = this.genderNumberManager.getRefGender(verbInfo.agree, null);
          params.number = this.genderNumberManager.getRefNumber(verbInfo.agree, null);
        } else {
          params.gender = 'M';
          params.number = 'S';
        }
        params.tense = tense;
        params.verb = verb;
        params.person = person;
        return getConjugation_fr_FR(params);
    }
  }
  
  
  getConjugation_en_US(verb: string, tense: string, person: number, verbInfo: any): string {
    // console.log( this.compromise(verb).verbs().conjugate() );
    //console.log('TENSE: ' + tense);
    switch(tense) {
      case 'PRESENT':
        if (person!=2) return verb;
        return compromise(verb).verbs().toPresentTense().all().out();
      case 'PAST':
        return compromise(verb).verbs().toPastTense().all().out();
      case 'FUTURE':
        return compromise(verb).verbs().toFutureTense().all().out();
    }
    
  }
    
  
}


