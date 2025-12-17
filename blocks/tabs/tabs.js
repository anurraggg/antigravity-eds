import { toClassName } from '../../scripts/aem.js';

export default async function decorate(block) {
    // build tablist
    const tablist = document.createElement('div');
    tablist.className = 'tabs-list';
    tablist.setAttribute('role', 'tablist');

    // decorate tabs and panels
    const tabs = [...block.children].map((child) => child.firstElementChild);
    tabs.forEach((tab, i) => {
        const id = toClassName(tab.textContent);

        // decorate tablist item
        const button = document.createElement('button');
        button.className = 'tabs-tab';
        button.id = `tab-${id}`;
        button.innerHTML = tab.innerHTML;
        button.setAttribute('role', 'tab');
        button.setAttribute('aria-selected', i === 0);
        button.setAttribute('aria-controls', `tabpanel-${id}`);
        button.setAttribute('tabindex', i === 0 ? '0' : '-1');
        button.addEventListener('click', () => {
            block.querySelectorAll('[role=tab]').forEach((t) => {
                t.setAttribute('aria-selected', false);
                t.setAttribute('tabindex', -1);
            });
            block.querySelectorAll('[role=tabpanel]').forEach((p) => {
                p.setAttribute('aria-hidden', true);
            });
            button.setAttribute('aria-selected', true);
            button.setAttribute('tabindex', 0);
            const panel = block.querySelector(`#tabpanel-${id}`);
            panel.setAttribute('aria-hidden', false);
        });
        tablist.append(button);

        // decorate tabpanel
        const panel = block.children[i];
        panel.className = 'tabs-panel';
        panel.id = `tabpanel-${id}`;
        panel.setAttribute('role', 'tabpanel');
        panel.setAttribute('aria-hidden', i !== 0);
        panel.setAttribute('aria-labelledby', `tab-${id}`);
    });

    block.prepend(tablist);
}
