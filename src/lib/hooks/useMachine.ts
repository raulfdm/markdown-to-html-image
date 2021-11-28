import type { FormStateMachine } from '$lib/store';
import { readable } from 'svelte/store';
import { interpret } from 'xstate';
import type { InterpreterOptions } from 'xstate';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useMachine(machine: FormStateMachine, options?: Partial<InterpreterOptions>) {
  const service = interpret(machine, options);

  const store = readable(service.initialState, (set) => {
    service.onTransition((state) => {
      set(state);
    });

    service.start();

    return () => {
      service.stop();
    };
  });

  return {
    state: store,
    send: service.send
  };
}
