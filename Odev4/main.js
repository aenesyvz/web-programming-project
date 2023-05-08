const sr = ScrollReveal({
    distance: '60px',
    duration: 2800,
    delay:0
    // reset: true,
})

sr.reveal(`.title,.section__title,.skill-l`,{
    origin:"left",
    interval:100
})

sr.reveal(`.sub__title,.section__border,.skill-r`,{
    origin:"right",
    interval:100
})

sr.reveal(`.about__img,.info`,{
    origin:"top",
    interval: 100,
})

sr.reveal(`.about__data,.slider`,{
    origin:"bottom"
})
