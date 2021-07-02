import {Component, Input, OnInit , OnChanges, SimpleChanges, SimpleChange} from '@angular/core';
import * as $ from 'jquery';
import { AuthService } from 'app/shared/services/auth/auth.service';
import {LoginComponent} from 'app/main/user/login.component';
import {GameStartComponent} from 'app/main/game-start/game-start.component';
import {MatDialog} from '@angular/material/dialog';
import {PostService} from '../../shared/services/post/post.service';
import {ProfileService} from '../../shared/services/profile.service';
import {ActivatedRoute, Router} from '@angular/router';
import { AppConstants } from 'app/shared/constants';
@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss']
})
export class ChannelComponent implements OnChanges {


  games = [
      {img: '/assets/images/banner/1.png', alias: '윈조이플러스 오픈', link: 'https://poker.winjoygame.com/poker?gameEname=baccarat'},
      {img: '/assets/images/banner/1.png', alias: '윈조이플러스 오픈', link: 'https://poker.winjoygame.com/poker?gameEname=baccarat'},
      {img: '/assets/images/banner/1.png', alias: '윈조이플러스 오픈', link: 'https://poker.winjoygame.com/poker?gameEname=baccarat'},
      {img: '/assets/images/banner/1.png', alias: '윈조이플러스 오픈', link: 'https://poker.winjoygame.com/poker?gameEname=baccarat'}
  ];
    loading = true;
    dialogRef: any;
    dialogRef_gameStart: any;
    token : any;
    isSupported: boolean;
    @Input() isLoggedIn: boolean;
    @Input() user: any;
    constructor(
        private authService: AuthService,
        private _matDialog: MatDialog
    ) {
    }

  ngOnInit(): void {
      $('.channel_box a').click(function() {
          if (!$(this).hasClass('ready')) {
              // tslint:disable-next-line:prefer-const
              let $thisCH = $(this),
                  // $totalCH = $('.channel_box a'),
                  // $activeCH = $('.channel_box a.active'),
                  // $defCH = $('.channel_box a.def'),
                  $totalCH = $thisCH.closest('.channel_box').find('a'),
                  $activeCH = $thisCH.closest('.channel_box').find('a.active'),
                  $effectCoin = $thisCH.closest('.channel_box').find('.effect_coin'),
                  $thisIdx = Number($thisCH.index());

              const defer = $.Deferred();

              const gameCode = $thisCH.data('gamecode');
              const gameName = $thisCH.data('gamename');
              const gameType = $thisCH.data('gametype');

              // DEF TYPE CHIP ANIMATION SETTING
              if (!$thisCH.hasClass('active')) {
                  // HIDE ON TYPE ELEMENT
                  hideAni($totalCH.find('.btn'));
                  hideAni($totalCH.find('.btn_m'));
                  hideAni($totalCH.find('.maintenance'));
                  hideAni($totalCH.find('.on_cover'));
                  hideAni($totalCH.find('.on_bg'));
                  // SHOW ON TYPE ELEMENT
                  showAni($totalCH.find('.off_cover'));
                  showAni($totalCH.find('.off_bg'));

                  // ACTIVE CHIP SET DEFAULT SIZE
                  $activeCH.stop().animate({ width: '153px', left: '523px' }, 100);
                  // ACTIVE CHIP ZOOM
                  $activeCH.find('.channel').stop().animate({ width: '157px', height: '157px' }, 100, function() {
                      $activeCH.css('width', '').removeClass('active').addClass('def');
                      $activeCH.find('img').removeClass('active');
                      // SET TARGET CHIPS ANIMATION and POSITION
                      switch ($thisIdx) {
                          case 1:
                              resetAni($thisCH);
                              sizeAni(2, 3, 4, 5, '725px', '882px', '158px', '315px', $thisCH.find('.channel'), (Math.abs($activeCH.index() - $thisCH.index())));
                              break;
                          case 2:
                              resetAni($thisCH);
                              sizeAni(1, 3, 4 ,5, '725px', '882px', '158px','315px', $thisCH.find('.channel'), (Math.abs($activeCH.index() - $thisCH.index())));
                              break;
                          case 3:
                              resetAni($thisCH);
                              sizeAni(1,2, 4,5, '725px', '882px','158px', '315px', $thisCH.find('.channel'), (Math.abs($activeCH.index() - $thisCH.index())));
                              break;
                          case 4:
                              resetAni($thisCH);
                              sizeAni(1, 2, 3,5, '158px', '315px', '725px', '882px', $thisCH.find('.channel'), (Math.abs($activeCH.index() - $thisCH.index())));
                              break;
                          case 5:
                              resetAni($thisCH);
                              sizeAni(1, 2, 3, 4 , '158px', '315px', '725px', '882px', $thisCH.find('.channel'), (Math.abs($activeCH.index() - $thisCH.index())));
                              break;
                      }
                  });



              }
              // else {

              // }

              // ANIMATION OPACITY 0
              function hideAni(target) {
                  hideAni1(target, false);
              }

              function hideAni1(target, after) {
                  target.stop().animate({ opacity: 0 }, 350, function() {
                      if (after) {
                          // 애니메이션이 끝난 후 동작 설정
                      }
                  });

                  $effectCoin.hide().children('span').css({ top: 120, opacity: 0 });
              }

              // ANIMATION OPACITY 1
              function showAni(target) {
                  target.stop().animate({ opacity: 1 }, 350);
              }

              // ANIMATION TARGET RESET SIZE
              function resetAni(target) {
                  target.removeClass('def').addClass('active').stop().animate({ width: '230px', left: '483px' }, 100);
                  target.find('img').addClass('active');
              }

              // ANIMATION CHANGE SIZE DEFAULT ONLY
              function sizeAni(a11, b11, c11, d11, a2, b2, c2, d2, target, idx) {
                  const a1 = Number(a11),
                      b1 = Number(b11),
                      c1 = Number(c11),
                      d1 = Number(d11)
                  const $time = 100 + (40 * idx);
                  $totalCH.eq(a1).stop().animate({ width: '153px', left: a2 }, $time);
                  $totalCH.eq(b1).stop().animate({ width: '153px', left: b2 }, $time);
                  $totalCH.eq(c1).stop().animate({ width: '153px', left: c2 }, $time);
                  // $totalCH.eq(d1).stop().animate({ width: '153px', left: d2 }, $time);
                  // $totalCH.eq(e1).stop().animate({ width: '153px', left: e2 }, $time);
                  $totalCH.eq(d1).stop().animate({ width: '153px', left: d2 }, $time, function() {
                      zoomAni(target).then(function() {
                          ($thisCH.find('.channel').next('.effect_coin').length > 0) && coinAni($thisCH.find('.channel').next('.effect_coin'));
                      });
                  });
              }

              // ANIMATION TARGET ZOOM and ON
              function zoomAni(target) {
                  target.stop().animate({ width: '257px', height: '257px' }, 200, function() {
                      target.stop().animate({ width: '237px', height: '237px' }, 150, function() {
                          target.stop().animate({ width: '247px', height: '247px' }, 350);

                          if (target.parent().hasClass('maintenance')) {
                              hideAni(target.find('.btn'));
                              showAni(target.find('.btn_m'));
                              hideAni(target.find('.on_bg'));
                              showAni(target.find('.off_cover'));
                          } else {
                              showAni(target.find('.btn'));
                              hideAni(target.find('.btn_m'));
                              showAni(target.find('.on_bg'));
                              hideAni(target.find('.off_cover'));
                          }

                          defer.resolve();
                      });
                  });

                  return defer.promise();
              }

              // ANIMATION TARGET coin and ON
              function coinAni(target) {
                  target.show();

                  const coinLeftPosY = [
                      { target: '.coin1', y: 260 },
                      { target: '.coin2', y: 250 },
                      { target: '.coin3', y: 240 },
                      { target: '.coin4', y: 230 },
                      { target: '.coin5', y: 220 },
                      { target: '.coin6', y: 202 }
                  ];
                  const coinRightPosY = [
                      { target: '.coin7', y: 256 },
                      { target: '.coin8', y: 246 },
                      { target: '.coin9', y: 238 }
                  ];

                  $.each(coinLeftPosY, function(idx, data) {
                      const time = 100 + (60 * idx);

                      target.children(data.target).stop().animate({ top: data.y + 'px', opacity: 1 }, time);
                  });

                  $.each(coinRightPosY, function(idx, data) {
                      const time = 100 + (60 * idx);

                      target.children(data.target).stop().animate({ top: data.y + 'px', opacity: 1 }, time);
                  });
              }
          }
      });
  }

    ngOnChanges(changes: SimpleChanges) {
        for (const property in changes) {
            if (property === 'isLoggedIn') {
                this.isLoggedIn = changes[property].currentValue;
            }
            if (property === 'user') {
                this.user = changes[property].currentValue;
            }
        }
    }

    // tslint:disable-next-line:typedef
    clickPanel(event: any) {
      if (event.target.classList.contains('active')){
        this.isSupported  = false;
        if(this.isLoggedIn && typeof this.user == "object" && this.user != null){
          let currentUser = JSON.parse(localStorage.getItem(AppConstants.currentUser));
          if (currentUser && currentUser.access_token) {
            this.token = currentUser.access_token
          }
          window.location.href = 'onegame://accessKey=/'+this.token;
          this.dialogRef_gameStart = this._matDialog.open(GameStartComponent, {
              panelClass: 'user-dialog',
              data      : {
                htmlStr : '<input id=\'protocol\' value=\'FourOnes\' style=\'width:1px;height:1px; left:-5000px;top:-5000px;position:absolute;\' />'
              }
          });
          this.dialogRef_gameStart.afterOpened()
              .subscribe(response => {
                setTimeout(() => {
                  this.dialogRef_gameStart.close();
                }, 3000);
              });
        }
        else{
          this.dialogRef = this._matDialog.open(LoginComponent, {
              panelClass: 'user-dialog',
              data      : {
              }
          });
          this.dialogRef.afterClosed()
              .subscribe(response => {
                  if (this.isLoggedIn) {
                      location.reload()
                  }
              });
        }
      }
    }

    RunGameStart(type, code){
       // alert(code);
    }
}
