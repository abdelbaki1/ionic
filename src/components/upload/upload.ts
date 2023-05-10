import { Component, EventEmitter, Input, Output } from '@angular/core';

/**
 * Generated class for the UploadComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'upload',
  templateUrl: 'upload.html'
})
export class UploadComponent {

  text: string;
  @Input()image :string =""
  @Output()uploaded =new EventEmitter<any>();

  constructor() {
    console.log('Hello UploadComponent Component');
    this.text = 'Hello World';
  }
  upload(files: FileList): void {
    const reader = new FileReader();
    reader.readAsDataURL(files.item(0));
    reader.onload = () => {
      this.image= reader.result as string;
      this.uploaded.emit(this.image)
      console.log(this.image);
      
    };
    
      
  }

}
