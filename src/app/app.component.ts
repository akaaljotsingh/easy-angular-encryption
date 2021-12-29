import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as CryptoJS from 'crypto-js';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  tokenFromUI: string = "0123456789123456";
  encrypted: any = "";
  decrypted: any;

  request: any;
  response: any;
  requestPass:any;
  responsePass:any;
  outPass: any;
  toggleFlag: boolean = false;

  constructor(private _snackBar: MatSnackBar){}

  encryptUsingAES256() {
    this.decrypted = "";
    let space = "#";
    // console.log(this.request.concat(" "+this.requestPass));
    let req = this.request.concat(space+this.requestPass)
    let _key = CryptoJS.enc.Utf8.parse(this.tokenFromUI);
    let _iv = CryptoJS.enc.Utf8.parse(this.tokenFromUI);
    let encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(req), _key, {
        keySize: 16,
        iv: _iv,
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      });
    this.encrypted = encrypted.toString();
  }
  decryptUsingAES256() {
    let _key = CryptoJS.enc.Utf8.parse(this.tokenFromUI);
    let _iv = CryptoJS.enc.Utf8.parse(this.tokenFromUI);

    let a = CryptoJS.AES.decrypt(
      this.response, _key, {
        keySize: 16,
        iv: _iv,
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      }).toString(CryptoJS.enc.Utf8);
      a = a.slice(1,-1);
      let b = a.split('#');
      this.outPass = b[1];
      if(this.outPass == this.responsePass) {
        this.decrypted = b[0];
      } else {
        this.decrypted = '';
        this._snackBar.open('Wrong Password', "Okay", {
          duration: 3000,
        });
      }
  }
  copyToClipboard() {
    this._snackBar.open('Text copied to clipboard', "Okay", {
      duration: 3000,
    });
  }
}
