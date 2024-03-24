import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TagData, TagifySettings } from 'ngx-tagify';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent {

  @Input() whitelist: BehaviorSubject<TagData[]>;
  @Output() tagsSelected: EventEmitter<TagData[]> = new EventEmitter();

  // tagsValues: any;
  tags: TagData[];

  settings: TagifySettings = {
    placeholder: 'Comienza a escribir...',
    blacklist: ['fucking', 'shit'],
    tagTextProp: 'name',
    skipInvalid: false,
    // classNames: {
    //   input: 'form-control mb-2'
    // },
    dropdown: {
      closeOnSelect: true,
      enabled: 0,
      classname: 'users-list',
      searchKeys: ['name', 'email']
    },
    templates: {
      tag(tagData) {
        return `
          <tag title="${tagData.email ? tagData.email : tagData.name}"
                contenteditable='false'
                spellcheck='false'
                tabIndex="-1"
                class="tagify__tag"
                ${this.getAttributes(tagData)}>
            <x title='' class='tagify__tag__removeBtn' role='button' aria-label='remove tag'></x>
            <div>
            ${ tagData.avatar ?
              `<div class='tagify__tag__avatar-wrap'>
                    <img src="${tagData.avatar}">
                </div> ` : ''
            }
            ${ tagData.name ?
              `<span class='tagify__tag-text'>${tagData.name}</span>` : ''
            }
            </div>
        </tag>`;
      },
      dropdownItem(tagData) {
        return `
          <div ${this.getAttributes(tagData)}
            class='tagify__dropdown__item'
            tabindex="0"
            tagifySuggestionIdx="${tagData.value}"
            role="option">
            ${ tagData.avatar ?
              `<div class='tagify__dropdown__item__avatar-wrap'>
                    <img src="${tagData.avatar}">
                </div>` : ''
            }
            ${ tagData.name ?
            `<strong>${tagData.name}</strong>` : ''
            }
            ${ tagData.email ?
            `<span>${tagData.email}</span>`: ''
            }
        </div>`;
      },
      dropdownHeader(suggestions) {
        return `
          <header data-selector='tagify-suggestions-header' class="${this.settings.classNames.dropdownItem} ${this.settings.classNames.dropdownItem}__addAll">
            <div>
                <strong class='selected-all-tags'>${this.value.length ? 'Agregar restante' : 'Añadir todo'}</strong>
                <a class='remove-all-tags'>Eliminar todo</a>
            </div>
            <span>${suggestions.length} registros</span>
        </header>
        `;

      }
    },
    transformTag: (tagData) => {
      const { name, email } = this.parseFullValue(tagData.name);
      tagData.name = name;
      tagData.email = email || tagData.email;
    },
    validate: ({ name, email }) => {
      // if (!email && name) {
      //   const parsed = this.parseFullValue(name);
      //   name = parsed.name;
      //   email = parsed.email;
      // }

      // if (!name) {
      //   console.log('Missing name');
      //   return 'Missing name';
      //  }
      // if (!this.validateEmail(email)) {
      //   console.log('Invalid email');
      //   return 'Invalid email';
      //  }

      return true;
    },
    callbacks: {
      'dropdown:show': (event) => {
        console.log('dropdown:show->',event);
      },
      'dropdown:select': (event: any) => {
        const tagify = event.detail.tagify;

        if (event.detail.event.toElement.className === 'remove-all-tags'){
          tagify.removeAllTags();
        } else if (event.detail.elm.classList.contains(`${tagify.settings.classNames.dropdownItem}__addAll`)) {
          tagify.dropdown.selectAll();
        }
      },
      'edit:start': (event) => {
        event.detail.tagify.setTagTextNode(
          event.detail.tag,
          `${event.detail.data.name} ${event.detail.data.email}`
        );
      },
    }
    // whitelist: [
    //   {
    //     value: '1',
    //     name: 'Justinian Hattersley',
    //     avatar: 'https://i.pravatar.cc/80?img=1',
    //     email: 'jhattersley0@ucsd.edu',
    //     team: 'A'
    //   },
    //   {
    //     value: '2',
    //     name: 'Antons Esson',
    //     avatar: 'https://i.pravatar.cc/80?img=2',
    //     email: 'aesson1@ning.com',
    //     team: 'B'
    //   },
    //   {
    //     value: '3',
    //     name: 'Ardeen Batisse',
    //     avatar: 'https://i.pravatar.cc/80?img=3',
    //     email: 'abatisse2@nih.gov',
    //     team: 'A'
    //   },
    //   {
    //     value: '4',
    //     name: 'Graeme Yellowley',
    //     avatar: 'https://i.pravatar.cc/80?img=4',
    //     email: 'gyellowley3@behance.net',
    //     team: 'C'
    //   },
    //   {
    //     value: '5',
    //     name: 'Dido Wilford',
    //     avatar: 'https://i.pravatar.cc/80?img=5',
    //     email: 'dwilford4@jugem.jp',
    //     team: 'A'
    //   },
    //   {
    //     value: '6',
    //     name: 'Celesta Orwin',
    //     avatar: 'https://i.pravatar.cc/80?img=6',
    //     email: 'corwin5@meetup.com',
    //     team: 'C'
    //   },
    //   {
    //     value: '7',
    //     name: 'Sally Main',
    //     avatar: 'https://i.pravatar.cc/80?img=7',
    //     email: 'smain6@techcrunch.com',
    //     team: 'A'
    //   },
    //   {
    //     value: '8',
    //     name: 'Grethel Haysman',
    //     avatar: 'https://i.pravatar.cc/80?img=8',
    //     email: 'ghaysman7@mashable.com',
    //     team: 'B'
    //   },
    //   {
    //     value: '9',
    //     name: 'Marvin Mandrake',
    //     avatar: 'https://i.pravatar.cc/80?img=9',
    //     email: 'mmandrake8@sourceforge.net',
    //     team: 'B'
    //   },
    //   {
    //     value: '10',
    //     name: 'Corrie Tidey',
    //     avatar: 'https://i.pravatar.cc/80?img=10',
    //     email: 'ctidey9@youtube.com',
    //     team: 'A'
    //   },
    //   {
    //     value: '11',
    //     name: 'foo',
    //     avatar: 'https://i.pravatar.cc/80?img=11',
    //     email: 'foo@bar.com',
    //     team: 'B'
    //   },
    //   {
    //     value: '12',
    //     name: 'foo',
    //     avatar: 'https://i.pravatar.cc/80?img=12',
    //     email: 'foo.aaa@foo.com',
    //     team: 'A'
    //   }
    // ]
  };

  ngOnInit(): void {
  }

  onAdd(event: any) {
    this.tagsSelected.emit(event.tags);
  }

  onRemove(event: any) {
    this.tagsSelected.emit(event);
  }

  private validateEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  private parseFullValue(value: string) {
    const parts = value.split(/<(.*?)>/g);
    const name = parts[0].trim();
    const email = parts[1]?.replace(/<(.*?)>/g, '').trim();

    return { name, email };
  }




}
