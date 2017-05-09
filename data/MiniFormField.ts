import {FormControl, ValidatorFn, Validators} from "@angular/forms";
export class MiniFormField {

  /**
   * Name of the property
   */
  private _name: string;

  /**
   * Label to be shown for field
   */
  private _label: string;

  /**
   * Type of field
   */
  private _type: FieldType;

  /**
   * Validators
   */
  private _validators: ValidatorFn|ValidatorFn[] = null;
  /**
   * Form controls
   */
  private _formControl: FormControl;

  /**
   *  Options provided for fields with multiple extras
   */
  private _extras:any;

  constructor(name: string, type: FieldType, label?:string, validator?: ValidatorFn|ValidatorFn[], extras?:any){
    this._name = name;
    this._label = label;
    this._validators = validator;
    this._formControl = new FormControl('', validator);

    if(!label){
      let newLabel:string = name;
      if(newLabel.length && newLabel[0] == '_') {
        newLabel = name.substring(1);
      }

      this._label = newLabel;
    }

    this._type = type;
    this.extras = extras;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }
  get label(): string {
    return this._label;
  }

  set label(value: string) {
    this._label = value;
  }
  get type(): FieldType {
    return this._type;
  }

  set type(value: FieldType) {
    this._type = value;
  }

  get extras(): any {
    return this._extras;
  }

  set extras(value: any) {
    this._extras = value;
  }

  get formControl(): FormControl {
    return this._formControl;
  }

  set formControl(value: FormControl) {
    this._formControl = value;
  }

  get validators(): ValidatorFn | ValidatorFn[] {
    return this._validators;
  }

  public getTranslation(translation: string) {
    return this.extras &&
      this.extras.translations &&
      this.extras.translations[translation];
  }

  public hasErrors():boolean {
    return this._validators != null;
  }

  public getErrors(): string[] {
    if(!this.hasErrors()){ return [];}

    if(this._validators instanceof Array){

    }else{

    }
  }
}


export enum FieldType {
  Text,
  TextArea,
  Number,
  Checkbox,
  Select,
  Radio,
}
