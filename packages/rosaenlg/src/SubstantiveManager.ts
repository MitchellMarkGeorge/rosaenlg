import { GenderNumberManager } from './GenderNumberManager';
import { getCaseGermanWord } from '@rosaenlg/german-words';
import { getNumberItalianWord } from '@rosaenlg/italian-words';
import { Languages, Genders, GendersMF, Numbers, GermanCases } from './NlgLib';
import { WordsData } from '@rosaenlg/rosaenlg-pug-code-gen';
import * as compromise from 'compromise';
import * as plural from 'pluralize-fr';

//import * as Debug from 'debug';
//const debug = Debug('rosaenlg');

export class SubstantiveManager {
  private language: Languages;
  private genderNumberManager: GenderNumberManager;
  private spy: Spy;

  private embeddedWords: WordsData;

  public constructor(language: Languages, genderNumberManager: GenderNumberManager) {
    this.language = language;
    this.genderNumberManager = genderNumberManager;
  }

  public setSpy(spy: Spy): void {
    this.spy = spy;
  }
  public setEmbeddedWords(embeddedWords: WordsData): void {
    this.embeddedWords = embeddedWords;
  }

  private getSubstantiveEn(subst: string, number: Numbers): string {
    if (number === 'S') {
      return subst;
    } else {
      // maybe we could have a more efficient way to call the lib here?
      return compromise(subst)
        .nouns()
        .toPlural()
        .all()
        .out();
    }
  }

  // todo, or not todo?
  private getSubstFeminineFr(subst: string): string {
    return subst;
  }

  private getSubstPluralFr(subst: string): string {
    return plural(subst);
  }

  private getSubstantiveFr(subst: string, gender: GendersMF, number: Numbers): string {
    // debug(`getSubstantiveFr on ${subst} gender ${gender} number ${number}`);
    let withGender: string = gender === 'F' ? this.getSubstFeminineFr(subst) : subst;
    let withNumber: string = number === 'P' ? this.getSubstPluralFr(withGender) : withGender;
    return withNumber;
  }

  private getSubstantiveIt(subst: string, gender: GendersMF, number: Numbers): string {
    return getNumberItalianWord(subst, number, this.embeddedWords);
  }

  private getSubstantiveDe(subst: string, number: Numbers, germanCase: GermanCases): string {
    // in this (very specific, too specific?...) case it's ok if not in dict
    if (this.language === 'de_DE' && germanCase === 'NOMINATIVE' && number === 'S') {
      return subst;
    } else {
      return getCaseGermanWord(subst, germanCase, number, this.embeddedWords);
    }
  }

  public getSubstantive(
    subst: string,
    subject: string,
    params: { gender: Genders; numberOwned: Numbers; case: GermanCases },
  ): string {
    if (this.spy.isEvaluatingEmpty()) {
      return 'SOME_SUBST';
    } else {
      var gender: Genders;
      var number: Numbers;
      if (subject) {
        gender = this.genderNumberManager.getRefGender(subject, null);
        number = this.genderNumberManager.getRefNumber(subject, null);
      } else {
        gender = params.gender;
        number = params.numberOwned;
      }

      switch (this.language) {
        case 'en_US':
          return this.getSubstantiveEn(subst, number);
        case 'de_DE':
          return this.getSubstantiveDe(subst, number, params.case);
        case 'fr_FR':
          return this.getSubstantiveFr(subst, gender as GendersMF, number);
        case 'it_IT':
          return this.getSubstantiveIt(subst, gender as GendersMF, number);
        default:
          return subst;
      }
    }
  }
}