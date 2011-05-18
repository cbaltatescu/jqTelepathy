/*!
 * jQuery Telepathy plugin 0.1.2
 *
 * Copyright 2011, Cristian Baltatescu
 * Licensed under the GPL license.
 * 
 * Date: Thu May 18 12:30:49 2011
 */
 
(function($){
    $.fn.telepathy = function(options){
        
        var getAttention = function(elem){
            console.log('fade1', elem);
            
            elem.fadeOut(300, function(){
                console.log('fade2');
                
                elem.fadeIn(300, function(){
                    elem.fadeOut(300, function(){
                        
                        elem.fadeIn(300, function(){
                            if(!settings.avancedMode){
                                giveHints(elem);
                            }    
                        });
                        
                    });
                });
            });
        }
        

        var messages = new Array();
        messages.push('I\'m sorry.<br/>You\'ll have to try to concentrate harder!');
        messages.push('Is there a radio or a stereo on?<br/>Please turn it off and concentrate harder!');
        messages.push('I\'m not receiving anything.<br/>Please turn off other applications if you\'re using Windows.');
        messages.push('You want some tweets displayed here, but the user is unclear.<br/>Please concentrate on the user more.<br/>If it\'s someone you know, think about when you last saw him/her.');
        messages.push('You seem to want a menu here, but the menu items are unclear.<br/>Please list them AGAIN in your mind!');
        messages.push('You want this to fade but I can\'t read for how many seconds.<br/>Please Think of a number now!');
        messages.push('I can\'t read anything!<br/>If you are wearing any tin foil please remove it!');
        messages.push('I can\'t read anything!<br/>Microwaves usually interfere with thought waves!');
        messages.push('Are you near a cemetery or working in a building where someone has died violently?<br/>Ghosts can interfere with this plugin!');
        messages.push('Where you ever in a coma? If so, ask a colegue to concentrate for you.');
        
        var readMind = function(elem){

            var rnd = Math.floor(Math.random() * (10 - 5 + 1) + 5);
            
            function read(elem){
                var r = Math.random() * 9;

                elem.html('<div id="jqt-hints" style="padding:5px">' + messages[Math.floor(r)] + '</div>');
                readMind(elem);
            }
            
            setTimeout(function(){read(elem)}, rnd * 1000);
            
        }
        
        var giveHints = function(elem){
            var originalContent = elem.html();
            
            elem.html('<div id="jqt-hints" style="padding:5px">This is the only jQuery plugin you will ever need!<sup>(TM)</sup><br/><br/>Just concentrate on the desired functionality of this part of your site and the plugin will accomplish just that.</div>');
            setTimeout(function(){
                var s = 3;
                elem.html('<div id="jqt-startInfo" style="padding:5px">Please start in <span id="jqt-secs">'+s+'</span> second(s).<br/><br/><span style="font-size:9px"></span></div>');
                var startT = setInterval(function(){
                    if(s > 0){
                        s--;
                        $('#jqt-secs').html(s);
                    } else {
                        clearInterval(startT);
                        $('#jqt-startInfo').html('Receiving your thoughts...');
                        
                        readMind(elem);
                    }
                },1000);
            },6000);
        }
        
        var init = function(elem){
            
            if(settings.border){
                elem.css('border', settings.borderStyle);
            }  
            
            if(settings.initFlash){
                getAttention(elem);
            } else {
                if(!settings.avancedMode){
                    giveHints(elem);
                }   
            }
            
        }
        
        //defaults array
        var settings = {
            'border':   true,
            'borderStyle':  '1px solid magenta',
            'initFlash': true,
            'avancedMode': false
        };
        
        // jquery plugin dispatching
        return this.each(function(){
            
            // If options exist, lets merge them
            // with our default settings
            if (options) {
                $.extend(settings, options);
            }
            
            init($(this));
               
        });
    };
})(jQuery)
