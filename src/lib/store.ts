import { writable } from 'svelte/store';
import { createMachine, assign } from 'xstate';

export const store = writable({
  url: '',
  alt: '',
  height: undefined,
  width: undefined
});

export const actions = {
  setUrl: (url: string) => {
    store.update((store) => {
      return { ...store, url };
    });
  }
};

export const formMachine = createMachine(
  {
    id: 'form',
    initial: 'idle',
    context: {
      markdown: '![]()',
      url: '',
      alt: '',
      width: undefined,
      height: undefined
    },
    states: {
      idle: {
        on: {
          FOCUS_MARKDOWN: 'markdown',
          FOCUS_URL: 'url',
          FOCUS_ALT: 'alt'
        }
      },
      markdown: {
        on: {
          LOST_FOCUS: 'idle',
          INPUT_CHANGE: {
            target: 'markdown',
            actions: 'updateMarkdown'
          }
        }
      },
      url: {
        on: {
          LOST_FOCUS: 'idle',
          INPUT_CHANGE: {
            target: 'url',
            actions: ['updateUrl']
          }
        },
        exit: []
      },
      alt: {
        on: {
          LOST_FOCUS: 'idle',
          INPUT_CHANGE: {
            target: 'alt',
            actions: ['updateAlt']
          }
        },
        exit: []
      }
    }
  },
  {
    actions: {
      updateUrl: assign({
        url: (ctx, event: { value: string; type: string }) => {
          return event.value;
        },
        markdown: (ctx, event: { value: string; type: string }) => {
          return `![${ctx.alt}](${event.value})`;
        },
        html: (ctx, event: { value: string; type: string }) => {
          return `<img src="${event.value}" alt="${ctx.alt}" />`;
        }
      }),
      updateAlt: assign({
        alt: (ctx, event: { value: string; type: string }) => {
          return event.value;
        },
        markdown: (ctx, event: { value: string; type: string }) => {
          return `![${event.value}](${ctx.url})`;
        }
      }),
      updateMarkdown: assign({
        markdown: (ctx, event: { value: string; type: string }) => {
          return event.value;
        },
        url: (ctx, event: { value: string; type: string }) => {
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
        alt: (ctx, event: { value: string; type: string }) => {
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
      })
    }
  }
);
