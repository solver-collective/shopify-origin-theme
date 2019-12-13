window.onload = () => {

    let domReady = setTimeout(() => {
        if (document.readyState === 'complete') {
            //console.log('dom ready')
            clearInterval(domReady)
        }

    }, 500)

    // Window Resizing
    let $onResizeTimer; // wait until after resize has finished or this repeats like a dog in heat
    window.onresize = function () {
        clearTimeout($onResizeTimer);
        $onResizeTimer = setTimeout(function () {
            //console.log('window was resized')
        }, 300);
    };

}