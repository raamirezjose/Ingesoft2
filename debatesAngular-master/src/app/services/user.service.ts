import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../Model/user';
import { Menu } from '../Model/menu';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private headers: HttpHeaders;
  private accessPointUrl: string = 'http://localhost:61568/api/user';
  /* static instance:UserRegisterService; */
  private loginState = false;
  constructor(private http: HttpClient,private currentUser:User,private userRol:Menu) 
  { 
   /*  UserRegisterService.instance = this; */
    this.headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
  }

  public add(user) {
    return this.http.post(this.accessPointUrl,user, {headers: this.headers});
  }
  
  public login(credentials)
  {
    return this.http.get(this.accessPointUrl+'/getlogin',{headers: this.headers,params:credentials}); 
  }

  public deleteAccount(password)
  {
    return this.http.delete(this.accessPointUrl+"/?id="+this.currentUser.Id+"&password="+password,{headers: this.headers}) ;
  }

  public getRolMenuRest(menu)
  {
    return this.http.get(this.accessPointUrl+"/getRolMenu/?rol="+menu,{headers: this.headers}) ;
  }

  public setup()
  {
    return this.http.get(this.accessPointUrl+'/getSetup',{headers: this.headers}); 
  }

  public setLoginInfo(usr,menu)
  {
      this.currentUser = usr;
      this.userRol = menu;
      this.loginState = true;
  }
 
  public getLoginState()
  {
     return this.loginState;
  }

  public getUserName()
  {
    return this.currentUser.Name+" "+this.currentUser.SecondName;
  }

  public getUserId()
  {
    return this.currentUser.Id;
  }

  public logOut()
  {
    this.loginState = false;
  }

  public getMenu()
  {
    return this.userRol;
  }
}
