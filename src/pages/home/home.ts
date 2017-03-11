import { Component } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { NavController, LoadingController } from 'ionic-angular';
import { toutiaoPage } from '../toutiao/toutiao';
import { toutiaoHotListPage } from '../toutiaoHotList/toutiaoHotList';
import { toutiaoListPage } from '../toutiaoList/toutiaoList';
import { videolistPage } from '../videolist/videolist';
import { searchPage } from '../search/search';
import { rankingPage } from '../ranking/ranking';
import { UserService } from '../service/User.service';
import { seeworkPage } from '../seework/seework';


declare var $: any;
declare var Swiper: any;
declare var window;
declare var JPushPlugin;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',

})
export class HomePage {

  public oSwiper = null;
  public oUser = null;
  alias: string = '111';
  msgList: Array<any> = [];
  work:any = [];
  art:any = [];

  public headers: Headers;

  constructor(public navCtrl: NavController, public http: Http, public loadingCtrl: LoadingController, public userService: UserService) {
    //this.RongCloudS.RongCloudLibPlugin_init();
    //this.initJPush();
    this.gethotart();
    userService.setnav(this.navCtrl);
  }

  //获取最热头条
  gethotart(){
    let url = "http://www.devonhello.com/cfdk/indexarticlelist";

    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    this.http.post(url, "", {
      headers: headers
    })
      .subscribe((res) => {
        //alert(JSON.stringify(res.json()));
        this.art = res.json();
        //this.getquecomment();
        this.getwork();
      });

      
  }

  //获取最热作品
  getwork(){
    let url = "http://www.devonhello.com/cfdk/indexworklist";

    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    this.http.post(url, "len="+this.work.length, {
      headers: headers
    })
      .subscribe((res) => {
        //alert(JSON.stringify(res.json()));
        this.work = this.work.concat(res.json());
        //this.getquecomment();
      });

      
  }


  //刷新视频
  doRefresh(refresher) {

    this.presentLoadingDefault();

    setTimeout(() => {
      refresher.complete();
    }, 3000);
  }


  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: '请稍后...'
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 3000);
  }

  //打开菜谱分类／搜索
  pushsearchPage() {
    this.navCtrl.push(searchPage);
  }

  //查看作品详情
  openwork(id) {
    this.navCtrl.push(seeworkPage,{
      id:id
    });
  }

  //打开养生头条
  pushtoutiaoPage(index) {
    alert(index);
    alert(this.art[index]["_id"]);
    this.navCtrl.push(toutiaoPage,{
      id:this.art[index]["_id"]
    });
  }

  //打开排名
  pushrankingPage() {
    this.navCtrl.push(rankingPage);
  }

  //打开热门养生头条
  pushtoutiaoHotListPage() {
    this.navCtrl.push(toutiaoHotListPage);
  }

  //打开养生头条
  pushtoutiaoListPage() {
    this.navCtrl.push(toutiaoListPage);
  }

  //打开视频
  pushvideoPage() {
    this.navCtrl.push(videolistPage);
  }


  ionViewDidEnter() {

    if (this.oSwiper == null) {

      //this.RongCloudLibPlugin_init();


      this.oSwiper = new Swiper('.swiper-container', {
        loop: true,
        autoplay: 5000,
        autoplayDisableOnInteraction: false,
        // 如果需要分页器
        pagination: '.swiper-pagination',
      });

      this.oUser = new Swiper('.swiper-container-user', {
        slidesPerView: 4,
        paginationClickable: true,
        slidesPerGroup: 4,
        spaceBetween: 6
      });


    }

  }

}
