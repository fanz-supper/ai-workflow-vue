import service from './server.js'

export class FlowNodeResultApi {

    public queryList<T = any>(data: any) {
        return service.get<T>('/flow/nodeResult/list', data);
    }

    public queryById<T = any>(data: any) {
        return service.get<T>('/flow/nodeResult/qid', data)
    }

}

export default new FlowNodeResultApi();





