import styles from './styles.css';

function docsifyFoldComment(hook, vm) {
    hook.doneEach(function () {
        const nodes = document.querySelector('#main').childNodes;
        nodes.forEach(function (val, i) {
            // filter not p+pre[data-lang="comment"]
            if (i === 0) return;
            if (val.nodeName !== 'PRE') return;
            if (val.getAttribute('data-lang') !== 'comment') return;
            if (nodes[i - 1].nodeName !== 'P') return;
            // Hide Code
            val.style.display = 'none';
            // Add button
            const img = document.createElement('img');
            img.src = require('./right.jpg');
            img.classList.add('docsify-fold-comment-button');
            nodes[i - 1].appendChild(img);
            // Set parent position
            nodes[i - 1].style.position = 'relative';
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
                if (isHidden) {
                    button.src = require('./down.jpg');
                    codeNode.style.display = 'block';
                } else {
                    button.src = require('./right.jpg');
                    codeNode.style.display = 'none';
                }
            }
        });
    });
}

window.$docsify = window.$docsify || {};
window.$docsify.plugins = [docsifyFoldComment].concat(window.$docsify.plugins || []);