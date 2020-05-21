import { Injectable } from "@angular/core";
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

//useless
@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {
    
    constructor(private authServ: AuthService, private router: Router, private alertify: AlertifyService){}
    canActivate(): boolean {
        if(this.authServ.currClient.isAdmin)
        {
            return true;
        }
        this.alertify.error("Your are not an admin!");
        this.router.navigate(['/products']);
        return false;

    }
}