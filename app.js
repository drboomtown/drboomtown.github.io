var dropdowns = document.querySelectorAll('.dropdown');
var _loop_1 = function (i) {
    dropdowns[i].addEventListener('click', function (e) {
        if (e.target.classList.contains('dropdown-item')) {
            dropdowns[i].querySelector('button').innerText = e.target.innerText;
        }
    });
};
for (var i = 0; i < dropdowns.length; i++) {
    _loop_1(i);
}
//# sourceMappingURL=app.js.map