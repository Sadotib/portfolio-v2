/*
   Navigation / Modal Controls
*/

(function () {
    'use strict';

    // Close modal on Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && window.location.hash) {
            window.location.hash = '';
        }
    });

    // Close modal when clicking the overlay background
    document.querySelectorAll('.modal-overlay').forEach(function (overlay) {
        overlay.addEventListener('click', function (e) {
            if (e.target === overlay) {
                window.location.hash = '';
            }
        });
    });

})();

