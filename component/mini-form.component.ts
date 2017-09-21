import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {IMiniFormModel} from "../data/MiniFormModelInterface";
import {FieldType, MiniFormField} from "../data/MiniFormField";
import {FormGroup} from "@angular/forms";
import {MyAccountModel} from "../../../models/my-account-model";
import {Translations} from "../data/enTranslations";

@Component({
  selector: 'mini-form',
  templateUrl: './mini-form.component.html',
  styleUrls: ['./mini-form.component.css']
})
export class MiniFormComponent implements OnInit {

  private FieldType:any = FieldType;
  private fields:MiniFormField[];
  private miniFormGroup:FormGroup;
  //Model implementing the IMiniFormModel interface that is used to create the form
  @Input() model: IMiniFormModel;
  //Whether or not the form should post even if invalid
  @Input() validate: boolean = true;

  //
  @Output() onSubmit = new EventEmitter();


  constructor() {
  }

  ngOnInit() {
    this.fields =  this.model.getFormFields();
    let formGroups:any = {};

    for (var i = 0; i < this.fields.length; i++) {
      var field = this.fields[i];
      formGroups[field.name] = field.formControl;
    }

    this.miniFormGroup = new FormGroup(formGroups);
  }

  miniFormSubmit(){
    if(!this.miniFormGroup.valid && this.validate){
      console.log('Form not valid');
      //touch all fields on submit
      Object.keys(this.miniFormGroup.controls).forEach(key => {
        this.miniFormGroup.get(key).markAsTouched();
      });
      return;
    }
    let newModel = new MyAccountModel();

    for(let property in this.miniFormGroup.value){
      newModel[property] = this.miniFormGroup.value[property];
    }

    this.onSubmit.emit(newModel);
  }

  /**
   *  Get an array of error messages for the specified field
   * @param field
   * @returns {string[]}
   */
  getErrorMessages(field:MiniFormField): string[] {
    let translations = Translations.validations;
    let texts:string[] = [];

    //add existing translations for the field errors
    for(let textKey in field.formControl.errors){
      let translation = field.getTranslation(textKey) || translations[textKey];

      if(translation){
        texts.push(translation);
      }
    }
    return texts;
  }
}
