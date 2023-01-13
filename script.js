// ==UserScript==
// @name         StoryBlocks Downloader
// @namespace    http://www.storyblocks.com/
// @version      0.1
// @description  try to take over the world!
// @author       onivestaf
// @match        https://www.storyblocks.com/*/*/*
// @require      https://code.jquery.com/jquery-3.5.1.min.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=storyblocks.com
// @grant        GM_download
// ==/UserScript==

(function() {
    var url = "";
    var doc = (document.getElementsByTagName('html')[0].innerHTML).split("\n");
    for (let index = 0; index < doc.length; index++) {
        var line = doc[index];
        if (line.search("previewUrl") !== -1){
            line = line.replace(";", "");
            url = (line.split('"previewUrl":"')[1].split('"')[0]).replaceAll("\\", "");
            break;
        }
    }

    setTimeout(() => {
        if (url != ""){
            document.querySelector(".visitorSignUpButton-cta").innerHTML = '<button class="PrimaryButton" id="forceDownload">Force Download!</button>';
            $( "#forceDownload" ).click(function() {
                var title = document.querySelector(".stockItemInfo-title").innerHTML;
                var arg = { url: url,
                           name: title+".mp3"
                };

                GM_download(arg);
            });
        }
    }, "3000")
})();
