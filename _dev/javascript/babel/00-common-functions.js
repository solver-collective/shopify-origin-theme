// Responsive Sizes
const client_sm = 768,
    client_md = 992,
    client_lg = 1200,
    client_xl = 1400

// Check if the Document has a certain Element ID
const _hasId = (el_id) => {
    if (document.contains(document.getElementById(el_id))) {
        console.log('This Page has ' + el_id + ' ID')
        return true
    }
}

// Check if the Document Body has a certain Class
const _isPageClass = (page_class) => {
    if (document.getElementsByTagName("body")[0].className.indexOf(page_class) > -1) {
        //console.log('This Page has ' + page_class + ' Class')
        return true
    } else {
        return false
    }
}

// Check if an Element has a certain Class
const _hasClass = (el, name) => {
    if (el.className.indexOf(name) > -1) {
        return true
    } else {
        return false
    }
}

// Check if User is on Mobile Device
const _mobileDevice = () => {
    if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(
            /webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(
            /iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(
            /BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) {
        console.log('Yes - Mobile')
        return true
    }
}

// Scroll Sections
const _scroll_position = () => {

    const scroll_li = document.querySelectorAll('.scroll-target-menu-li'),
        scroll_link = document.querySelectorAll('.scroll-target-menu-li a'),
        init_link = () => {
            for (let i = 0; i < scroll_link.length; i++) {
                ((i) => {

                    let li_top = scroll_link[i].getBoundingClientRect().top,
                        li_bottom = scroll_link[i].getBoundingClientRect().bottom,
                        section = document.querySelector(scroll_link[i].getAttribute('href')),
                        section_top = section.getBoundingClientRect().top,
                        section_bottom = section.getBoundingClientRect().bottom

                    if (li_top > section_top && li_bottom < section_bottom) {
                        scroll_li[i].classList.add('active')
                    } else {
                        scroll_li[i].classList.remove('active')
                    }

                })(i)
            }
        }

    init_link()

    window.addEventListener('scroll', () => {
        init_link()
    })
}

// Insert Elements in DOM
const _insertAfter = (newNode, referenceNode) => {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

// Get the position of an element relative to the document
const _offset = (el) => {
    let rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop

    return {
        top: rect.top + scrollTop,
        left: rect.left + scrollLeft
    }
}

// Warn User to Rotate Device
const _orientationForce = () => {
    const orientationOverlay = document.getElementById('orientationOverlay')

    // We only care about mobile orientation
    if (_mobileDevice()) {
        // Force Portrait Mode
        let mediaLandscape = window.matchMedia("(orientation:landscape)");
        console.log("Device held " + (mediaLandscape.matches ? "horizontally" : "vertically"));
        if (mediaLandscape.matches) {
            console.log("Lanscape Mode.");
            document.getElementById('orientationOverlay').style.cssText = 'visibility: visible;'
        }

        let overlayOrienation = function (mediaLandscape) {
            if (mediaLandscape.matches) {
                console.log("Lanscape Mode.");
                document.getElementById('orientationOverlay').style.cssText = 'visibility: visible;'
            } else {
                console.log("Portrait Mode");
                document.getElementById('orientationOverlay').style.cssText = 'visibility: hidden;'
            }
        }
        mediaLandscape.addListener(overlayOrienation);


    }
}

// Tabs
const _tabs = () => {
    // Listen for click events
    document.addEventListener('click', function (event) {
        let tabLinks = document.querySelectorAll('.tab-toggle')

        //console.log(event)

        // Only take action if the clicked link was a tab toggle with a valid anchor link
        if (!event.target.classList.contains('tab-toggle') || !event.target.hash) return;

        // Get the anchored content
        let content = document.querySelector(event.target.hash)
        if (!content) return

        // Remove all Previous Active Tabs
        for (let i = 0; i < tabLinks.length; i++) {
            (function (i) {
                //console.log(tabLinks[i])
                tabLinks[i].classList.remove('active')
            })(i)
        }
        // Activate Tab
        event.target.classList.add('active')

        // Tab Pane -> Store the ID as a data attribute and remove it
        content.setAttribute('data-id', content.id)
        content.id = ''


        // Set Body Class
        document.getElementsByTagName('body')[0].classList.add('tabs-active')

    }, false)
    // Listen for hashchange events
    window.addEventListener('hashchange', function (event) {

        // Get the anchored content
        let content = document.querySelector('[data-id="' + window.location.hash.substring(1) + '"]'),
            tabPanes = document.querySelectorAll('.tab-pane')

        if (!content) return

        // Restore the ID
        content.id = content.getAttribute('data-id');

        // Open the content, close other tabs, whatever
        for (let i = 0; i < tabPanes.length; i++) {
            (function (i) {
                console.log(tabPanes[i])
                tabPanes[i].classList.remove('active')
            })(i)
        }
        content.classList.add('active')
        console.log('Made Active')

        // Try to bring the content into focus
        content.focus()

        // If it didn't work, give the content a tabindex of -1 and try again
        if (document.activeElement.id !== content.id) {
            content.setAttribute('tabindex', '-1')
            content.focus()
        }

        // Set Body Class
        document.getElementsByTagName('body')[0].classList.add('tabs-active')

    }, false)
    // Get the content
    if (window.location.hash.length > 0) {
        let content = document.querySelector(window.location.hash),
            activeTab = document.querySelector("a[href='" + window.location.hash + "']")

        console.log(activeTab)

        if (activeTab) {
            activeTab.classList.add('active')
        }
        // If the content is a tab, open it
        if (content && content.classList.contains('tab-pane')) {
            content.classList.add('active');
            // close other tabs or do whatever else here
        }
        // Set Body Class
        document.getElementsByTagName('body')[0].classList.add('tabs-active')
    }

    // Add the .tabs-loaded class to the <html> element
    document.documentElement.classList.add('tabs-loaded');
}

// MODAL OVERLAY
const _modalOverlay = (hiddenElement) => {
    let body = document.querySelector('body'),
        modalOverlayContainer = document.createElement('div'),
        modalContentWrapper = document.createElement('div'),
        modalContent = document.getElementById(hiddenElement),
        closer = document.createElement('div')

    // MODAL CONTAINER
    modalOverlayContainer.id = 'modalOverlay'

    // CONTENT
    modalContentWrapper.id = 'modalContent'
    modalContentWrapper.classList.add('modal')
    modalContentWrapper.innerHTML = modalContent.innerHTML


    // CLOSER
    closer.classList.add('closer-button', 'modal')
    closer.innerHTML = '<span>Close</span><i class="fa fa-close"></i>'
    closer.style.cssText = 'position: fixed; top: 20px; right: 20px; z-index: 100;'

    // Add to DOM
    body.appendChild(modalOverlayContainer)
    body.appendChild(modalContentWrapper)
    body.appendChild(closer)

    // Active States
    modalOverlayContainer.classList.add('open')
    body.classList.add('modalBlur')
    window.scrollTo(0, 0)

    // Removal Process
    closer.addEventListener('click', (event) => {
        console.log('Clicked Closer')
        body.removeChild(modalContentWrapper)
        body.removeChild(closer)
        body.removeChild(modalOverlayContainer)
        body.classList.remove('modalBlur')
    })
}

//
const _modalButtons = () => {
    let modalButtons = document.querySelectorAll('.modal-button')

    if (modalButtons) {

        for (let i = 0; i < modalButtons.length; i++) {
            modalButtons[i].onclick = function () {
                let modalRef = modalButtons[i].getAttribute('data-modal')
                _modalOverlay(modalRef)
            }
        }
    }
}

// BACK TO TOP
const _back_to_top = () => {
    let h = Math.max(document.documentElement.clientHeight, window.innerHeight)
    let main = document.getElementsByTagName('main')[0]
    let backToTop = document.getElementById('back-to-top')

    backToTop.addEventListener('click', function(e){ 
        e.preventDefault()
        window.scroll({
            top: 0, 
            left: 0, 
            behavior: 'smooth' 
          })
    })
    
    window.addEventListener('scroll', () => {
        if (main.getBoundingClientRect().top < -400) {
            backToTop.classList.add('active')
        } else {
            backToTop.classList.remove('active')
        }
	})
}