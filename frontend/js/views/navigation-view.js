import AbstractView from './abstract-view';

const LinkClass = {
  ACTIVE: `navigation__link--active`,
  COMPLETE: `navigation__link--complete`
};

export default class NavView extends AbstractView {
  constructor(questions) {
    super();
    this._questions = questions;
  }

  get template() {
    return `
      <div class="navigation">
        <ul class="navigation__list">
          ${this._questions.map((question, i) => `<li class="navigation__item">
              <a href="#" class="navigation__link" data-question="${i}">${i + 1}</a>
            </li>`).join(``)}
        </ul>
      </div>`;
  }

  bind() {
    const listEl = this._element.querySelector(`.navigation__list`);
    listEl.addEventListener(`click`, (evt) => {
      const classes = evt.target.classList;
      if (!classes.contains(`navigation__link`)) {
        return;
      }

      evt.preventDefault();

      if (classes.contains(LinkClass.ACTIVE) || classes.contains(LinkClass.COMPLETE)) {
        return;
      }
      this.onNavClick(+evt.target.getAttribute(`data-question`));
    });
  }

  onNavClick() {}

  setActiveItem(number) {
    const listEl = this._element.querySelector(`.navigation__list`);
    const activeEl = listEl.querySelector(`.${LinkClass.ACTIVE}`);

    if (activeEl) {
      activeEl.classList.remove(LinkClass.ACTIVE);
    }

    const newActiveEl = listEl.querySelectorAll(`.navigation__link`)[number];
    if (newActiveEl) {
      newActiveEl.classList.add(LinkClass.ACTIVE);

      // центрирование
      const itemOffset = newActiveEl.offsetLeft;
      const itemWidth = newActiveEl.offsetWidth;
      const listHalfWidth = listEl.offsetWidth / 2;
      const itemMargin = parseInt(getComputedStyle(newActiveEl).marginLeft);

      listEl.scrollLeft = itemOffset - listHalfWidth;
    }
  }
  setCompleteItem(number) {
    const listEl = this._element.querySelector(`.navigation__list`);
    const linkEl = listEl.querySelectorAll(`.navigation__link`)[number];
    if (linkEl) {
      linkEl.classList.add(LinkClass.COMPLETE);
    }
  }
}
