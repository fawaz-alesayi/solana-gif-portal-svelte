import { createModel } from 'xstate/lib/model.js';
import { assign, interpret } from 'xstate';

const gifDataStore = [
	'https://c.tenor.com/BjO9lUT6sNYAAAAi/pepe-frog.gif',
	'https://c.tenor.com/OmkN64qYnMkAAAAC/pepe-the-frog-trippy.gif',
	'https://c.tenor.com/C1vNcAGyoG0AAAAC/pepe-frog.gif',
	'https://c.tenor.com/W5Or9vSpgCAAAAAC/pepe-wink-pepe.gif'
];

export const gifModel = createModel({
	// All the GIF links
	gifUrls: [] as string[],

	// The current URL that the user has entered in the input box.
	currentUrl: ''
},
{
    events: {
        SUBMIT_GIF: (value: string) => ({ value }),
        LOAD_GIFS: () => ({})
    }
});



export const gifMachine = gifModel.createMachine({
	id: 'gifMachine',
	initial: 'idle',
	states: {
		idle: {
			on: {
				SUBMIT_GIF: {
					target: 'submittingGif'
				},
                LOAD_GIFS: {
                    target: 'loadingGifs',
                }
			}
		},
		submittingGif: {
			invoke: {
				src: (context, event) => {
                    if (event.type === 'SUBMIT_GIF')
                        return submitGif(event.value)
                },
				onDone: {
                    target: "loadingGifs",
					actions: assign({
						gifUrls: (context, event) => {
							return [...context.gifUrls, event.data];
						}
					}),
                },
				onError: {
					target: 'submitError',
				},
			},
		},
        submitSuccess: {},
		submitError: {},
		loadingGifs: {
            invoke: {
                src: () => loadGifUrls(),
                onDone: {
                    target: "loaded",
					actions: assign({
						gifUrls: (_, event) => {
							return event.data;
						}
					})
                }
            }
        },
		loaded: {
            on: {
                SUBMIT_GIF: {
                    target: 'submittingGif'
                },
				LOAD_GIFS: {
					target: "loadingGifs"
				},
            }
        },
		error: {}
	}
});

const submitGif = async (url: string) => {
	// submit to Solana block chain here.
    gifDataStore.push(url);
	return gifDataStore;
};

const loadGifUrls = async () => {
    return gifDataStore;
}

export const gifService = interpret(gifMachine).start();