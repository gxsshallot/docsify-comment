import styles from './styles.css';

const __show_image__ = require('./down.jpg');
const __hide_image__ = require('./right.jpg');

function changeFoldCommentButtonStatus(button, status) {
    const codeNode = button.parentNode.nextSibling;
    if (status) {
        button.src = __show_image__;
        codeNode.style.display = 'block';
    } else {
        button.src = __hide_image__;
        codeNode.style.display = 'none';
    }
}

function docsifyFoldComment(hook) {
    hook.doneEach(function () {
        const nodes = document.querySelectorAll('pre[data-lang="comment"]');
        nodes.forEach(function (val) {
            const prvItem = val.previousSibling;
            if (prvItem.nodeName !== 'P') return;
            // Add button
            const button = document.createElement('img');
            button.classList.add('docsify-fold-comment-button');
            prvItem.appendChild(button);
            prvItem.style.position = 'relative';
            changeFoldCommentButtonStatus(button, false);
        });
    });
    hook.mounted(function () {
        const listenerHost = document.querySelector('.content');
        listenerHost.addEventListener('click', function (evt) {
            const isCommentButton = evt.target.classList.contains('docsify-fold-comment-button');
            if (isCommentButton) {
                const button = evt.target;
                const codeNode = button.parentNode.nextSibling;
                const isHidden = codeNode.style.display === 'none';
                changeFoldCommentButtonStatus(button, isHidden);
            }
        });
    });
}

window.$docsify = window.$docsify || {};
window.$docsify.plugins = [docsifyFoldComment].concat(window.$docsify.plugins || []);