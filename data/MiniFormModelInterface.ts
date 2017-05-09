import {MiniFormField} from "./MiniFormField";
export interface IMiniFormModel {

  /**
   * Get the model properties that should be listed as form elements
   */
  getFormFields(): Array<MiniFormField>;

}
