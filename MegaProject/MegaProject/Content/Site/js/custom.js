// JavaScript Document
$(function() {
 "use strict";

  function responsive_dropdown () {
    /* ---- For Mobile Menu Dropdown JS Start ---- */
      $("#menu span.opener, #menu-main span.opener").on("click", function(){
          var menuopener = $(this);
          if (menuopener.hasClass("plus")) {
             menuopener.parent().find('.mobile-sub-menu').slideDown();
             menuopener.removeClass('plus');
             menuopener.addClass('minus');
          }
          else
          {
             menuopener.parent().find('.mobile-sub-menu').slideUp();
             menuopener.removeClass('minus');
             menuopener.addClass('plus');
          }
          return false;
      });

      jQuery( ".mobilemenu" ).on("click", function() {
        jQuery( ".mobilemenu-content" ).slideToggle();
        if ($(this).hasClass("openmenu")) {
            $(this).removeClass('openmenu');
            $(this).addClass('closemenu');
          }
          else
          {
            $(this).removeClass('closemenu');
            $(this).addClass('openmenu');
          }
          return false;
      });
    /* ---- For Mobile Menu Dropdown JS End ---- */

    /* ---- For Sidebar JS Start ---- */
      $('.sidebar-box span.opener').on("click", function(){
      
        if ($(this).hasClass("plus")) {
          $(this).parent().find('.sidebar-contant').slideDown();
          $(this).removeClass('plus');
          $(this).addClass('minus');
        }
        else
        {
          $(this).parent().find('.sidebar-contant').slideUp();
          $(this).removeClass('minus');
          $(this).addClass('plus');
        }
        return false;
      });
    /* ---- For Sidebar JS End ---- */

    /* ---- For Footer JS Start ---- */
      $('.footer-static-block span.opener').on("click", function(){
      
        if ($(this).hasClass("plus")) {
          $(this).parent().find('.footer-block-contant').slideDown();
          $(this).removeClass('plus');
          $(this).addClass('minus');
        }
        else
        {
          $(this).parent().find('.footer-block-contant').slideUp();
          $(this).removeClass('minus');
          $(this).addClass('plus');
        }
        return false;
      });
    /* ---- For Footer JS End ---- */

     /* ---- For Navbar JS Start ---- */
    $('.navbar-toggle').on("click", function(){
      var menu_id = $('#menu');
      var nav_icon = $('.navbar-toggle i');
      if(menu_id.hasClass('menu-open')){
        menu_id.removeClass('menu-open');
        nav_icon.removeClass('fa-close');
        nav_icon.addClass('fa-bars');
      }else{
        menu_id.addClass('menu-open');
        nav_icon.addClass('fa-close');
        nav_icon.removeClass('fa-bars');
      }
      return false;
    });
    /* ---- For Navbar JS End ---- */

    /* ---- For Category Dropdown JS Start ---- */
    $('.btn-sidebar-menu-dropdown').on("click", function() {

      $('.cat-dropdown').slideToggle();

      if($(".sidebar-block").hasClass("open1")){
        $(".sidebar-block").addClass("close1").removeClass("open1");
      }else{
        $(".sidebar-block").addClass("open1").removeClass("close1");
      }
    });
    /* ---- For Category Dropdown JS End ---- */

    /* ---- For Content Dropdown JS Start ---- */
    $('.content-link').on("click", function() {
      $('.content-dropdown').toggle();
    });
    /* ---- For Content Dropdown JS End ---- */
  }

  /* ---- For Navbar JS Start ---- */
  function slidebar_open(){
    $('.slidebar-open').on("click", function(){
      var menu_id = $('.shop-list');
      var nav_icon = $('.slidebar-open');
      if(menu_id.hasClass('menu-open')){
        menu_id.removeClass('menu-open');
      }else{
        menu_id.addClass('menu-open');
      }
      return false;
    });
  }
    /* ---- For Navbar JS End ---- */

  function popup_dropdown () {
    /*---- Category dropdown start ---- */
      $('.cate-inner span.opener').on("click", function(){
      
        if ($(this).hasClass("plus")) {
          $(this).parent().find('.mega-sub-menu').slideDown();
          $(this).removeClass('plus');
          $(this).addClass('minus');
        }
        else
        {
          $(this).parent().find('.mega-sub-menu').slideUp();
          $(this).removeClass('minus');
          $(this).addClass('plus');
        }
        return false;
      });
    /*---- Category dropdown end ---- */
  }

  /*---- Start sidebar height---- */
  function sidebar_margin() {
    $( ".homepage .sidebar-block").css("margin-top",$("#cat").height() );
  }
  /*---- End sidebar height---- */

  function popup_links() {
    /*---- Start Popup Links---- */
    $('.popup-with-form').magnificPopup({
      type: 'inline',
      preloader: false,
      focus: '#name',

      // When elemened is focused, some mobile browsers in some cases zoom in
      // It looks not nice, so we disable it:
      callbacks: {
        beforeOpen: function() {
          if($(window).width() < 700) {
            this.st.focus = false;
          } 
          else {
            this.st.focus = '#name';
          }
        }
      }
    });
    /*---- End Popup Links ---- */
    return false;
  }

  /* ----- popup_product Start  ------ */
   function popup_product() {
    $('.popup-with-product').magnificPopup({
      type: 'inline',
      preloader: false,
      focus: '#name',

      // When elemened is focused, some mobile browsers in some cases zoom in
      // It looks not nice, so we disable it:
      callbacks: {
        beforeOpen: function() {
          if($(window).width() < 700) {
            this.st.focus = false;
          } else {
            this.st.focus = '#name';
          }
        }
      }
    });
  }
  /* ----- popup_product End  ------ */

  function owlcarousel_slider () {
    /* ------------ OWL Slider Start  ------------- */

      /* ----- pro_cat_slider Start  ------ */
      $('.pro-cat-slider').owlCarousel({
        items: 6,
        navigation: true,
        pagination: false,
        itemsDesktop : [1769, 4],
        itemsDesktopSmall : [1199, 3],
        itemsTablet : [768, 2],
        itemsTabletSmall : false,
        itemsMobile : [479, 2]
      });
      /* ----- pro_cat_slider End  ------ */

      /* ----- sub_menu_slider Start  ------ */
      $('.sub_menu_slider').owlCarousel({
        items: 1,
        navigation: true,
        pagination: false,
        itemsDesktop : [1199, 1],
        itemsDesktopSmall : [991, 1],
        itemsTablet : [768, 1],
        itemsTabletSmall : false,
        itemsMobile : [479, 1]
      });
      /* -----sub_menu_slider End  ------ */

      /* ----- our-sell-pro_slider Start  ------ */
      $('#top-cat-pro').owlCarousel({
        items: 4,
        navigation: true,
        pagination: false,
        itemsDesktop : [1199, 3],
        itemsDesktopSmall : [991, 2],
        itemsTablet : [768, 2],
        itemsTabletSmall : false,
        itemsMobile : [479, 1]
      });
      /* ----- our-sell-pro_slider End  ------ */

      /* ----- our-sell-pro_slider Start  ------ */
      $('.sub-banner-slider').owlCarousel({
        items: 4,
        navigation: true,
        pagination: false,
        itemsDesktop : [1199, 3],
        itemsDesktopSmall : [991, 2],
        itemsTablet : [768, 2],
        itemsTabletSmall : false,
        itemsMobile : [479, 1]
      });
      /* ----- our-sell-pro_slider End  ------ */

      /* ----- tab_slider Start  ------ */
      $('.tab_slider').owlCarousel({
        items: 5,
        navigation: true,
        pagination: false,
        itemsDesktop : [1769, 4],
        itemsDesktopSmall : [1199, 3],
        itemsTablet : [768, 2],
        itemsTabletSmall : false,
        itemsMobile : [479, 2]
      });
      /* ----- tab_slider End  ------ */

      /* ----- best-seller-pro Start  ------ */
        $('.best-seller-pro').owlCarousel({
          items: 2,
          navigation: true,
          pagination: false,
          itemsDesktop : [1199, 1],
          itemsDesktopSmall : [991, 1],
          itemsTablet : [767, 2],
          itemsTabletSmall : false,
          itemsMobile : [500, 2]
        });
      /* ----- best-seller-pro End  ------ */

      /* ----- daily-deals Start  ------ */
        $('#daily_deals').owlCarousel({
          items: 2,
          navigation: true,
          pagination: false,
          itemsDesktop : [1769, 1],
          itemsDesktopSmall : [1199, 1],
          itemsTablet : [767, 1],
          itemsTabletSmall : false,
          itemsMobile : [500, 1]
        });
      /* ----- daily-deals End  ------ */

      /* ----- blog Start  ------ */
      $('#blog').owlCarousel({
        items: 1,
        navigation: true,
        pagination: false,
        itemsDesktop : [1199, 1],
        itemsDesktopSmall : [991, 1],
        itemsTablet : [768, 1],
        itemsTabletSmall : false,
        itemsMobile : [479, 1]
      });
      /* ----- blog End  ------ */

      /* ----- brand-logo Start  ------ */
      $('#brand-logo').owlCarousel({
        items: 6,
        navigation: true,
        pagination: false,
        itemsDesktop : [1769, 3],
        itemsDesktopSmall : [991, 3],
        itemsTablet : [768, 1],
        itemsTabletSmall : false,
        itemsMobile : [479, 1]
      });
      /* ----- brand-logo End  ------ */

      /* ----- pro_cat_slider Start  ------ */
      $('.our-team').owlCarousel({
        items: 5,
        navigation: true,
        pagination: false,
        itemsDesktop : [1769, 4],
        itemsDesktopSmall : [991, 2],
        itemsTablet : [768, 2],
        itemsTabletSmall : false,
        itemsMobile : [479, 2]
      });
      /* ----- pro_cat_slider End  ------ */

      /* ---- banner Start ---- */
      $(".main-banner, #sidebar-product, #client").owlCarousel({
     
        //navigation : true,  Show next and prev buttons
        slideSpeed : 300,
        paginationSpeed : 400,
        autoPlay: false,
        pagination:true,
        singleItem:true,
        navigation:true
      });
      /* ----- banner End  ------ */

      /* ---- instragram Start ---- */
      $(".instragram").owlCarousel({
     
        //navigation : true,  Show next and prev buttons
        slideSpeed : 300,
        paginationSpeed : 400,
        autoPlay: true,
        pagination:false,
        singleItem:false,
        navigation:false
      });
      /* ----- instragram End  ------ */

      return false;
    /* ------------ OWL Slider End  ------------- */
  }

  function scrolltop_arrow () {
   /* ---- Page Scrollup JS Start ---- */
   //When distance from top = 250px fade button in/out
    var scrollup = $('.scrollup');
    var headertag = $('header');
    var mainfix = $('.main');
    $(window).scroll(function(){
      if ($(this).scrollTop() > 0) {
          scrollup.fadeIn(300);
      } else {
          scrollup.fadeOut(300);
      }

      /* header-fixed JS Start */
      if ($(this).scrollTop() > 0){
         headertag.addClass("header-fixed");
      }
      else{ 
         headertag.removeClass("header-fixed");
      }

      /* main-fixed JS Start */
      if ($(this).scrollTop() > 0){
         mainfix.addClass("main-fixed");
      }
      else{ 
         mainfix.removeClass("main-fixed");
      }
      /* ---- Page Scrollup JS End ---- */
    });
    
    //On click scroll to top of page t = 1000ms
    scrollup.on("click", function(){
        $("html, body").animate({ scrollTop: 0 }, 1000);
        return false;
    });
  }

  function custom_tab() {
    /* ------------ Account Tab JS Start ------------ */
    $('.account-tab-stap').on('click', 'li', function() {
        $('.account-tab-stap li').removeClass('active');
        $(this).addClass('active');
        
        $(".account-content").fadeOut();
        var currentLiID = $(this).attr('id');
        $("#data-"+currentLiID).fadeIn();
        return false;
    });
    /* ------------ Account Tab JS End ------------ */
  }

  /* Price-range Js Start */
  function price_range () {
      $( "#slider-range" ).slider({
        range: true,
        min: 0,
        max: 800,
        values: [ 75, 500 ],
        slide: function( event, ui ) {
          $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
        }
      });
      $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) + " - $" + $( "#slider-range" ).slider( "values", 1 ) );
  }
  /* Price-range Js End */

  /*Video_Popup Js Start*/
  function video_popup() {
    if($('.popup-youtube').length > 0){      
    $('.popup-youtube').magnificPopup({          
        disableOn: 700,          
        type: 'iframe',          
        mainClass: 'mfp-fade',          
        removalDelay: 160,          
        preloader: false,          
        fixedContentPos: false      
      });    
    }  
  }
  /*Video_Popup Js Ends*/

  /*Select Menu Js Start*/
  function option_drop() {
    $( ".option-drop" ).selectmenu();
    return false;
  }
  /*Select Menu Js Ends*/

  /*countdown-clock Js Start*/
  function countdown_clock() {
    $('.countdown-clock').downCount({
      date: '03/04/2019 11:39:00',
          offset: +10
      }, 
      function () {
        //alert('done!'); Finish Time limit
      return false;
    });
  }
  /*countdown-clock Js End*/

  /* Product Detail Page Tab JS Start */
  function product_tab () {
    $("#tabs li a").on("click", function(e){
      var title = $(e.currentTarget).attr("title");
      $("#tabs li a ,.tab_content #items li div").removeClass("selected");
      $("#tabs .tab-"+title +",#items .items-"+title).addClass("selected");
      $("#items").attr("class","tab-"+title);

      return false;
    });
  }
  /* Product Detail Page Tab JS End */

  /* Product Detail Page Tab JS Start */
  function product_detail_tab () {
    $("#tabs li a").on("click", function(e){
      var title = $(e.currentTarget).attr("title");
      $("#tabs li a , .tab_content li div").removeClass("selected");
      $(".tab-"+title +", .items-"+title).addClass("selected");
      $("#items").attr("class","tab-"+title);

      return false;
    });
  }
  /* Product Detail Page Tab JS End */


  /* Mega Menu Tab JS Start */
  function megamenu_tab () {
    $("#megatabs li a").on("click", function(e){
      var title = $(e.currentTarget).attr("title");
      $("#megatabs li a , .tab_content #megaitems li div").removeClass("selected");
      $("#megatabs .menu-tab-"+title +",#megaitems .items-"+title).addClass("selected");
      $("#megaitems").attr("class","menu-tab-"+title);

      return false;
    });
  }
  /* Mega Menu Tab JS End */


  function location_page () {
    // Animate loader off screen
    var url = (window.location.href);
    var stepid = url.substr(url.indexOf("#") + 1);

    if($("ul").hasClass("account-tab-stap") && (window.location.hash) ) {
      if($("#"+stepid).length){
        $(".account-tab-stap li").removeClass("active");
        $("#"+stepid).addClass("active");

        if($("#data-"+stepid).length){
          $(".account-content").css("display","none");
          $("#data-"+stepid).css("display","block");
        }
      }
    }
  }

  /* Mega Menu mobile Tab JS Start */
  function detectmob() { 
   if( navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)){
      $(".sub-megamenu a").removeClass("selected");
      $("#megatabs li a").on("click", function(e){
        $(".megamenu-tab").addClass("open");
        $(".menu-back").show();
      });

      $(".menu-back").on("click", function(e){
        $(".megamenu-tab").removeClass("open");
        $(".menu-back").hide();
        $(".sub-megamenu a").removeClass("selected");
      });
      return true;
    }
   else {
      return false;
    }
  }
  /* Mega Menu mobile Tab JS End */

  /* grid_list_view Tab JS Start */
  function grid_list_view() {
    $('.shorting .view').on('click', '.list-types', function() {
      if($(this).hasClass("list")){
        $(this).addClass("active");
        $(".shorting .view .list-types.grid").removeClass("active");
        $(".product-listing").removeClass("grid-type").addClass("list-type");
      }
      if($(this).hasClass("grid")){
        $(this).addClass("active");
        $(".shorting .view .list-types.list").removeClass("active");
        $(".product-listing").removeClass("list-type").addClass("grid-type");
      }
    });
  }
  /* grid_list_view Tab JS End */

  $(document).on("ready", function() {
    owlcarousel_slider(); price_range (); responsive_dropdown(); product_tab (); product_detail_tab (); megamenu_tab (); custom_tab (); scrolltop_arrow (); popup_dropdown (); popup_product(); video_popup(); countdown_clock(); slidebar_open(); option_drop(); popup_links(); location_page(); sidebar_margin(); detectmob(); grid_list_view();
  });

  $( window ).on( "resize", function() {
      detectmob();
  });
});

  $( window ).on( "load", function() {
    // Animate loader off screen
    $(".se-pre-con").fadeOut("slow");
  });

  //btn click print
  function printDiv(divName) {
   var printContents = document.getElementById(divName).innerHTML;
   var originalContents = document.body.innerHTML;
   document.body.innerHTML = printContents;
   window.print();
   document.body.innerHTML = originalContents;
   return false;
  }
