import service from './server.js'

export class FlowApi {

    public queryList<T = any>(data: any) {
        return service.get<T>('/flow/list', data);
    }

    public queryByName<T>(data: any) {
        return service.get<T>('/flow/qname', data)
    }

    public queryById<T = any>(data: any) {
        return service.get<T>('/flow/qid', data)
    }

    public add<T = any>(data: any) {
        return service.post('/flow/add', data)
    }

    public update<T = any>(data: any) {
        return service.post<T>('/flow/update', data)
    }

    public run<T = any>(data: any) {
        return service.post<T>('/flow/run', data)
    }
}

export default new FlowApi();





