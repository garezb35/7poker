import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';

import { PostService } from 'app/shared/services/post/post.service';
import { AuthService } from 'app/shared/services/auth/auth.service';
import { ProfileService } from 'app/shared/services/profile.service';
import {LoginComponent} from 'app/main/user/login.component';
import * as _ from 'lodash';
import { AppConstants } from 'app/shared/constants';
import { Route } from '@angular/compiler/src/core';
import { SlickCarouselComponent } from 'ngx-slick-carousel';

@Component({
    selector   : 'home',
    templateUrl: './home.component.html',
    styleUrls  : ['./home.component.scss'],
    animations   : fuseAnimations
})
export class HomeComponent implements OnInit
{
    user: any = null;
    @ViewChild('slickModal', { static: true }) slickModal: SlickCarouselComponent;
    slides = [
        {img: '/assets/images/banner/1.png', alias: 'ONEGAWE플러스 오픈', link: ''},
        {img: '/assets/images/banner/1.png', alias: 'ONEGAWE플러스 오픈', link: ''},
        {img: '/assets/images/banner/1.png', alias: 'ONEGAWE플러스 오픈', link: ''},
        {img: '/assets/images/banner/1.png', alias: 'ONEGAWE플러스 오픈', link: ''}
    ];

    slideConfig = {'slidesToShow': 1, 'slidesToScroll': 1, dots: false, prevArrow: null, nextArrow: null, autoplay: true};
    loading = true;
    dialogRef: any;
    isLoggedIn = false;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */
    constructor(
        private authService: AuthService,
        private postService: PostService,
        private profileService: ProfileService,
        private router: Router,
        private route: ActivatedRoute,
        private _matDialog: MatDialog,
    )
    {
        this.authService.isLoggedIn.subscribe((isLoggedIn) => {
            this.isLoggedIn = isLoggedIn;
            if (this.isLoggedIn){
                const tempuser = this.authService.getCurrentUser();
                if (tempuser){
                    this.profileService.getProfile().subscribe((user) => {
                        if(user.success){
                            this.user  = user.data[0]
                        }
                    });
                }
            }
        });
    }

    ngOnInit(): void
    {

    }

    // tslint:disable-next-line:typedef
    toggleUser(){
        // should show login dialog
        this.dialogRef = this._matDialog.open(LoginComponent, {
            panelClass: 'user-dialog',
            data      : {
            }
        });
        this.dialogRef.afterClosed()
            .subscribe(response => {
                if (this.isLoggedIn) {
                    // this.router.navigate(['upload_stl']);
                }
            });
    }

    // tslint:disable-next-line:typedef
    afterChange(e) {
        const element = document.getElementsByClassName('j-main-rolling-state-now');
        const rolling = document.getElementsByClassName('j-main-rolling-txt-item');
        element[0].innerHTML = e.currentSlide + 1;
        rolling[0].innerHTML = this.slides[e.currentSlide].alias;
    }

    // tslint:disable-next-line:typedef
    NextBanner() {
        this.slickModal.slickNext();
    }
    // tslint:disable-next-line:typedef
    PreBanner() {
        this.slickModal.slickPrev();
    }

    downloadApp(){
      window.location.href="/assets/game/WinjoyStarterInstaller.exe";
    }
}
