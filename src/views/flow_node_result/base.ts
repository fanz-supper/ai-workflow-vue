export interface FlowNodeResultType {
    id: string,
    nodeId: string,
    resultId: string,
    name: string,
    serviceType: string,
    input: string,
    output: string,
}
export interface ModelResultType {
    id:string,
    name: string,
    modelType: string,
    msg: string,
    result:string,
    promptTemplateId: string,
    dataConverterId: string,
}