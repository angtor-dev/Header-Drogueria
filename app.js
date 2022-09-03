var mobileEvents = false, DesktopEvents = false

if (window.innerWidth < 768) {
    addMobileEvents()
    mobileEvents = true
} else {
    addDesktopEvents()
    DesktopEvents = true
}

window.addEventListener('resize', () => {
    if (window.innerWidth < 768 && !mobileEvents) {
        removeDesktopEvents()
        addMobileEvents()
        mobileEvents = true
        DesktopEvents = false
    } else if (window.innerWidth >= 768 && !DesktopEvents) {
        removeMobileEvents()
        addDesktopEvents()
        mobileEvents = false
        DesktopEvents = true
    }
})

function addDesktopEvents() {
    // Activar Dropdown al hacer hover sobre "Registrarse +"
    const dropdownParent = document.querySelector('.h-dropdown-parent')
    const dropdown = document.querySelector('.h-dropdown-parent .h-dropdown')

    dropdownParent.addEventListener('mouseenter', e => {
        setTimeout(() => {
            dropdown.style.display = 'block'
            dropdown.style.opacity = '1'
        }, 300)
        if (typeof pLeaveTimer !== 'undefined') {
            clearTimeout(pLeaveTimer)
        }
    })

    dropdownParent.addEventListener('mouseleave', e => {
        pLeaveTimer = setTimeout(() => {
            dropdown.style.opacity = '0'
            setTimeout(() => {
                dropdown.style.display = 'none'
            }, 300)
        }, 450)
    })

    dropdown.addEventListener('mouseenter', () => {
        if (typeof pLeaveTimer !== 'undefined') {
            clearTimeout(pLeaveTimer)
        }
        dropdown.style.display = 'block'
    })
}

function removeDesktopEvents() {
    const dropdownParent = document.querySelector('.h-dropdown-parent')
    const dropdown = document.querySelector('.h-dropdown-parent .h-dropdown')

    dpClone = dropdownParent.cloneNode(true)
    dClone = dropdown.cloneNode(true)

    dropdown.parentNode.replaceChild(dClone, dropdown)
    dropdownParent.parentNode.replaceChild(dpClone, dropdownParent)
}

function addMobileEvents() {
    // Triggers de menus desplegables
    const bMenuEl = document.getElementById('bmenu-button')
    const registrarseEl = document.getElementById('registrarse')
    const dropdown = document.querySelector('.h-dropdown.collapsible')

    bMenuEl.addEventListener('click', () => {
        let collapsibleEl = document.querySelector('.h-navigation.collapsible')
        toggleCollapse(collapsibleEl)
    })

    registrarseEl.addEventListener('click', () => {
        let collapsibleEl = document.querySelector('.h-dropdown.collapsible')
        toggleCollapse(collapsibleEl)
    })

    if (dropdown.dataset.collapsed == 'true') {
        document.querySelector('.h-dropdown.collapsible').style = ''
        document.querySelector('.h-dropdown.collapsible').style.height = '0px'
    } else {
        console.log('Estaba abierto, Style vacio')
        document.querySelector('.h-dropdown.collapsible').style = ''
    }
}

function removeMobileEvents() {
    const bMenuEl = document.getElementById('bmenu-button')
    const registrarseEl = document.getElementById('registrarse')

    bMenuElClone = bMenuEl.cloneNode(true)
    registrarseElClone = registrarseEl.cloneNode(true)

    bMenuEl.parentNode.replaceChild(bMenuElClone, bMenuEl)
    registrarseEl.parentNode.replaceChild(registrarseElClone, registrarseEl)
}

// Funciones para los menus desplegables
function collapseSection(element) {
    let sectionHeight = element.scrollHeight;

    let elementTransition = element.style.transition;
    element.style.transition = '';

    requestAnimationFrame(function () {
        element.style.height = sectionHeight + 'px';
        element.style.transition = elementTransition;

        requestAnimationFrame(function () {
            element.style.height = 0 + 'px';
        });
    });

    element.setAttribute('data-collapsed', 'true');
}

function expandSection(element) {
    var sectionHeight = element.scrollHeight;
    if (element == document.querySelector('.h-navigation.collapsible')) {
        sectionHeight *= 2;
    }

    element.style.height = sectionHeight + 'px';

    element.addEventListener('transitionend', function (e) {
        element.removeEventListener('transitionend', arguments.callee);

        element.style.height = null;
    });

    element.setAttribute('data-collapsed', 'false');
}

function toggleCollapse(collapsibleEl) {
    let isCollapsed = collapsibleEl.getAttribute('data-collapsed') === 'true';

    if (isCollapsed) {
        expandSection(collapsibleEl)
        collapsibleEl.setAttribute('data-collapsed', 'false')
    } else {
        collapseSection(collapsibleEl)
    }
}