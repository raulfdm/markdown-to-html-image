import { createMachine, assign } from 'xstate';
import type { Event, SingleOrArray } from 'xstate';

type FormEvents =
  | { type: 'FOCUS_MARKDOWN' }
  | { type: 'FOCUS_URL' }
  | { type: 'FOCUS_ALT' }
  | { type: 'FOCUS_WIDTH' }
  | { type: 'FOCUS_HEIGHT' }
  | { type: 'LOST_FOCUS' }
  | { type: 'INPUT_CHANGE'; value: string };

interface FormContext {
  markdown: string;
  url: string;
  alt: string;
  width: string | undefined;
  height: string | undefined;
}

const FORM_STATES = {
  idle: 'idle',
  markdown: 'markdown',
  url: 'url',
  alt: 'alt',
  width: 'width',
  height: 'height'
};

const FORM_EVENTS = {
  focusMarkdown: 'FOCUS_MARKDOWN',
  focusUrl: 'FOCUS_URL',
  focusAlt: 'FOCUS_ALT',
  focusWidth: 'FOCUS_WIDTH',
  focusHeight: 'FOCUS_HEIGHT',
  lostFocus: 'LOST_FOCUS',
  inputChange: 'INPUT_CHANGE'
};

export const formMachine = createMachine<FormContext, FormEvents>(
  {
    id: 'form',
    initial: 'idle',
    context: {
      markdown: '![Random Image from Picsum](https://picsum.photos/200/300)',
      url: 'https://picsum.photos/200/300',
      alt: 'Random Image from Picsum',
      width: '200',
      height: '300'
    },
    states: {
      [FORM_STATES.idle]: {
        on: {
          [FORM_EVENTS.focusMarkdown]: FORM_STATES.markdown,
          [FORM_EVENTS.focusUrl]: FORM_STATES.url,
          [FORM_EVENTS.focusAlt]: FORM_STATES.alt,
          [FORM_EVENTS.focusWidth]: FORM_STATES.width,
          [FORM_EVENTS.focusHeight]: FORM_STATES.height
        }
      },
      [FORM_STATES.markdown]: {
        on: {
          [FORM_EVENTS.lostFocus]: FORM_STATES.idle,
          [FORM_EVENTS.inputChange]: {
            target: FORM_STATES.markdown,
            actions: ['updateMarkdown']
          }
        }
      },
      [FORM_STATES.url]: {
        on: {
          [FORM_EVENTS.lostFocus]: FORM_STATES.idle,
          [FORM_EVENTS.inputChange]: {
            target: FORM_STATES.url,
            actions: ['updateUrl']
          }
        }
      },
      [FORM_STATES.alt]: {
        on: {
          [FORM_EVENTS.lostFocus]: FORM_STATES.idle,
          [FORM_EVENTS.inputChange]: {
            target: FORM_STATES.alt,
            actions: ['updateAlt']
          }
        }
      },
      [FORM_STATES.width]: {
        on: {
          [FORM_EVENTS.lostFocus]: FORM_STATES.idle,
          [FORM_EVENTS.inputChange]: {
            target: FORM_STATES.width,
            actions: ['updateWidth']
          }
        }
      },
      [FORM_STATES.height]: {
        on: {
          [FORM_EVENTS.lostFocus]: FORM_STATES.idle,
          [FORM_EVENTS.inputChange]: {
            target: FORM_STATES.height,
            actions: ['updateHeight']
          }
        }
      }
    }
  },
  {
    actions: {
      updateUrl: assign({
        url: (_, event) => {
          if (event.type !== 'INPUT_CHANGE') return;
          return event.value;
        },
        markdown: (ctx, event) => {
          if (event.type !== 'INPUT_CHANGE') return;
          return `![${ctx.alt}](${event.value})`;
        }
      }),
      updateAlt: assign({
        alt: (_, event) => {
          if (event.type !== 'INPUT_CHANGE') return;
          return event.value;
        },
        markdown: (ctx, event) => {
          if (event.type !== 'INPUT_CHANGE') return;
          return `![${event.value}](${ctx.url})`;
        }
      }),
      updateMarkdown: assign({
        markdown: (ctx, event) => {
          if (event.type !== 'INPUT_CHANGE') return;
          return event.value;
        },
        url: (ctx, event) => {
          if (event.type !== 'INPUT_CHANGE') return;
          if (!event.value) {
            return ctx.url;
          }

          const REGEX_ULR = /\((.*)\)/;
          const result = event.value.match(REGEX_ULR);

          if (result === null) {
            return ctx.url;
          }

          const [_, url] = result;

          return url;
        },
        alt: (ctx, event) => {
          if (event.type !== 'INPUT_CHANGE') return;
          if (!event.value) {
            return ctx.alt;
          }

          const REGEX_ALT = /\[(.*)\]/;
          const result = event.value.match(REGEX_ALT);

          if (result === null) {
            return ctx.alt;
          }

          const [_, alt] = result;

          return alt;

          return '';
        }
      }),
      updateWidth: assign({
        width: (_, event) => {
          if (event.type !== 'INPUT_CHANGE') return;
          return event.value;
        }
      }),
      updateHeight: assign({
        height: (_, event) => {
          if (event.type !== 'INPUT_CHANGE') return;
          return event.value;
        }
      })
    }
  }
);

export type FormStateMachine = typeof formMachine;

export type IFormEvent = SingleOrArray<Event<FormEvents>>;
