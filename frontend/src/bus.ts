import mitt from 'mitt'

const emitter = mitt();

export default {
  on: (event: string, handler: any) => emitter.on(event, handler),
  off: (event: string, handler: any) => emitter.off(event, handler),
  emit: (event: string, args?: any) => emitter.emit(event, args)
}