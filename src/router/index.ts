import {createRouter, createWebHistory} from 'vue-router'
import Home from "@/views/Home.vue";
import ModelMain from "@/views/model/ModelMain.vue";
import PromptTemplateMain from "@/views/prompt_template/PromptTemplateMain.vue";
import FlowMain from "@/views/flow/FlowMain.vue";
import Flow from "@/views/flow/Flow.vue";
import MockDataMain from "@/views/mock/MockDataMain.vue";
import MockResultMain from "@/views/mock/MockResultMain.vue";
import FlowResultMain from "@/views/flow_result/FlowResultMain.vue";
import FlowNodeResultMain from "@/views/flow_node_result/FlowNodeResultMain.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            children: [
                {
                    path: '/modelMain',
                    name: 'modelMain',
                    component: ModelMain,
                },
                {
                    path: '/mockDataMain',
                    name: 'mockDataMain',
                    component: MockDataMain,
                },
                {
                    path: '/mockResultMain',
                    name: 'mockResultMain',
                    component: MockResultMain,
                },
                {
                    path: '/promptTemplateMain',
                    name: 'promptTemplateMain',
                    component: PromptTemplateMain,
                },
                {
                    path: '/flowMain',
                    name: 'flowMain',
                    component: FlowMain,
                },
                {
                    path: '/flow/:id?',
                    name: 'flow',
                    component: Flow,
                },
                {
                    path: '/flowResultMain',
                    name: 'flowResultMain',
                    component: FlowResultMain,
                },
                {
                    path: '/flowNodeResultMain',
                    name: 'flowNodeResultMain',
                    component: FlowNodeResultMain,
                },
            ]
        },
    ],
})

export default router
