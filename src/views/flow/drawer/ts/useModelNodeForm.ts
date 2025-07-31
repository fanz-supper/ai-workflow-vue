import {ref, computed, type Ref} from 'vue';
import {type GraphNode, useVueFlow} from '@vue-flow/core';
import promptTemplateApi from '@/api/prompt_template';
import modelApi from '@/api/model';

interface FormData {
    modelNodeId: string;
    name: string;
    type: string;
    promptTemplateId: string;
    msg: string;
    msgExpression: { nodeId: string };
    dataConverterId: string;
}

interface ModelNode {
    id: string;
    name: string;
    type: string;
    promptTemplateId: string;
    dataConverterId: string;
    msg: string;
}

interface RefNode {
    id: string;
    label: string;
}

interface PromptTemplate {
    id: string;
    name: string;
}

export function useModelNodeForm() {
    const {nodes, edges, updateNodeData} = useVueFlow();
    const modelNodeOptions = ref<ModelNode[]>([]);
    const nodeInfo = ref<GraphNode>()
    const promptTemplateOptions = ref<PromptTemplate[]>([]);
    const form = ref<FormData>({
        modelNodeId: '',
        name: '',
        type: '',
        promptTemplateId: '',
        msg: '',
        msgExpression: {nodeId: ''},
        dataConverterId: '',

    });
    const isSelectedModel = ref(false);

    const refNodes = computed(() => {

        const edgeMap = new Map(edges.value.map(edge => [edge.target, edge.source]));
        const nodeMap = new Map(nodes.value.map(node => [node.id, node.data.label]));

        const result: RefNode[] = [];
        let currentNodeId: string | undefined = nodeInfo.value?.id;

        while (currentNodeId) {
            currentNodeId = edgeMap.get(currentNodeId);
            if (currentNodeId && nodeMap.has(currentNodeId)) {
                result.push({id: currentNodeId, label: nodeMap.get(currentNodeId)!});
            }
        }
        return result;
    });


    const fillFormData = (nf: GraphNode) => {

        nodeInfo.value = nf;
        if (nodeInfo.value.data.params) {
            form.value = nodeInfo.value.data.params;
        }
    }

    const onModelSelectorChange = () => {

        isSelectedModel.value = !!form.value?.modelNodeId;
        if (isSelectedModel.value) {
            const node = modelNodeOptions.value.find(m => m.id === form.value!.modelNodeId);
            if (node) {
                Object.assign(form.value!, {
                    name: node.name,
                    type: node.type,
                    promptTemplateId: node.promptTemplateId,
                    msg: node.msg,
                    msgExpression: {nodeId: form.value?.msgExpression.nodeId},
                    dataConverterId: node.dataConverterId,
                });
            }
        }
    }

    const fetchModelNodes = async () => {
        modelApi.all()
            .then((res) => {
                modelNodeOptions.value = res.data.result;
            })
    };

    const fetchPromptTemplates = async () => {
        promptTemplateApi.all()
            .then((res) => {
                promptTemplateOptions.value = res.data.result;
            })
    };

    const resetForm = () => {
        form.value = {
            modelNodeId: '',
            name: '',
            type: '',
            promptTemplateId: '',
            msg: '',
            msgExpression: {nodeId: ''},
            dataConverterId: ''
        }
    }

    return {
        modelNodeOptions,
        promptTemplateOptions,
        onModelSelectorChange,
        refNodes,
        form,
        isSelectedModel,
        fillFormData,
        fetchModelNodes,
        fetchPromptTemplates,
        resetForm
    };
}