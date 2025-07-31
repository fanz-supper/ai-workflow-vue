import service from './server.js'

export class FlowResultApi {

    public queryList<T = any>(data: any) {
        return service.get<T>('/flow/result/list', data);
    }

    public queryById<T = any>(data: any) {
        return service.get<T>('/flow/result/qid', data)
    }
}

export default new FlowResultApi();





