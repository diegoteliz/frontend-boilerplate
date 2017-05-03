jQuery(document).ready(function($) {

    'use strict';

    // Define global variables
    var $window             = $(window),
        $body               = $('body'),
        $menuBtn            = $('.js-nav-btn'),
        $optionsBtn         = $('.js-options-menu-btn'),
        $mainHeader         = $('.js-main-header'),
        $menu               = $('.js-main-nav'),
        $optionsMenu        = $('.js-options-menu'),
        $overlay            = $('.js-overlay'),
        $navItem            = $('.js-nav-item'),
        $navLink            = $('.js-nav-link'),
        windowHeight        = $window.height(),
        windowWidth         = $window.width(),
        currentPosition     = $window.scrollTop(),
        breakpoints         = {
            phoneSmall      : 320,
            phoneMedium     : 480,
            phoneLarge      : 640,
            tablet          : 768,
            desktopSmall    : 1024
        };

    // Main navigation
    function openMenu() {

        // Close options menu if opened
        if($optionsMenu.is('.opened')) {
            closeOptionsMenu();
        }

        // Open menu
        $menu.addClass('opened');
        $menuBtn.addClass('active');
        $overlay.addClass('active');
    }

    function closeMenu() {
        $menu.removeClass('opened');
        $menuBtn.removeClass('active');
        $overlay.removeClass('active');
    }

    function toggleMenu() {
        if($menu.is('.opened')){
            closeMenu();
        } else {
            openMenu();
        }
    }

    $menuBtn.click(function(event) {
        event.preventDefault();
        toggleMenu();
    });

    // Navigations links
    $navLink.click(function(event) {
        event.preventDefault();
        $navLink.removeClass('active');
        $(this).addClass('active');
    });

    // Options menu
    function openOptionsMenu() {
        // Close main menu if opened
        if($menu.is('.opened')) {
            closeMenu();
        }

        // Open options menu
        $optionsMenu.addClass('opened');
        $overlay.addClass('invisible');
    }

    function closeOptionsMenu() {
        $optionsMenu.removeClass('opened');
        $overlay.removeClass('invisible');
    }

    function toggleOptionsMenu() {
        if($optionsMenu.is('.opened')){
            closeOptionsMenu();
        } else {
            openOptionsMenu();
        }
    }

    $optionsBtn.click(function(event) {
        event.preventDefault();
        toggleOptionsMenu();
    });

    // Close all opened menus
    function closeAll() {
        // Close main menu if opened
        if($menu.is('.opened')) {
            closeMenu();
        }

        // Close options menu if opened
        if($optionsMenu.is('.opened')) {
            closeOptionsMenu();
        }
    }
    
    // Overlay
    $overlay.click(function(event) {
        closeAll();
    });

    // General keydowns
    $window.keydown(function(event) {
        
        switch (event.which) {
            
            // Esc key
            case 27:
                
                closeAll();
                
                break;
        }
    });


    // Events triggered on scroll
    $window.on('scroll', function(event) {

        if (windowWidth <= breakpoints.desktopSmall) {

            // Show / Hide Main header on Mobile
            var scroll = $window.scrollTop();

            if (scroll > currentPosition) {
                if (currentPosition >= 50) {
                    $mainHeader.addClass('collapsed');
                }

            } else {
                if ($mainHeader.is('.collapsed')) {
                    $mainHeader.removeClass('collapsed');
                }
            }

            currentPosition = scroll;
        }

    });


    // Events triggered on Window resize
    $window.on('resize', function(event) {
        windowHeight    = $window.height();
        windowWidth     = $window.width();
    });

});