function copyText(text) {
    const url = window.location.href.split('#')[0]
    const anchorLink = url+"#"+text;
    navigator.clipboard.writeText(anchorLink);
}