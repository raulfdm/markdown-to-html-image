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
      html: '<img src="" alt="" />',
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
        on: { LOST_FOCUS: 'idle' },
        exit: ['updateAlt', 'updateUrl', 'updateHtmlUrl', 'updateHtmlAlt']
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
        },
        html: (ctx, event: { value: string; type: string }) => {
          return `<img src="${ctx.url}" alt="${event.value}" />`;
        }
      }),
      updateMarkdownUrl(context, event) {
        console.log('UPDATE Markdown URL');
      },
      updateMarkdownAlt(context, event) {
        console.log('UPDATE Markdown ALT');
      },
      updateHtmlUrl(context, event) {
        console.log('UPDATE HTML URL');
      },
      updateHtmlAlt(context, event) {
        console.log('UPDATE HTML ALT');
      }
    }
  }
);
