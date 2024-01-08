<template>
    <div>
        <!-- 面包屑地址条 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>库存管理</el-breadcrumb-item>
            <el-breadcrumb-item>入库任务</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片组件 -->
        <el-card>
            <!-- 搜索栏 -->
            <el-row :gutter="20">
                <el-col :span="8">入库单号
                    <el-input placeholder="请输入单号" v-model="searchStr.orderNo" clearableclear="inapplyList">

                    </el-input>
                </el-col>
                <el-col :span="8">申请日期
                    <el-input v-model="searchStr.requireTime" clearableclear="inapplyList">

                    </el-input>
                </el-col>
            </el-row>

            <el-row :gutter="20">
                <el-col :span="8">申请人
                    <el-input v-model="searchStr.inputerId" clearableclear="inapplyList">
                    </el-input>
                    <!-- <el-input v-model="userForm.userName" clearableclear="inapplyList">
                    </el-input> -->
                </el-col>
                <el-col :span="8">业务类型
                    <el-select v-model="searchStr.serviceType" placeholder="请选择业务类型">
                        <el-option label="采购入库" value="采购入库"></el-option>
                        <el-option label="生产入库" value="生产入库"></el-option>
                        <el-option label="退料入库" value="退料入库"></el-option>
                        <el-option label="退货入库" value="退货入库"></el-option>
                    </el-select>
                </el-col>
                <!-- <el-col :span="4"> -->
                <el-button type="primary" @click="getList">
                    搜索入库单
                </el-button>
                <el-button type="primary" @click="">
                    重置表单
                </el-button>
                <!-- </el-col> -->
            </el-row>
            <el-row :gutter="20">

            </el-row>
            <!-- <el-form :model="userForm" >
                    <el-form-item label="申请单号" prop="orderNo" style="margin-top:5px;">
                        <el-input v-model="userForm.account"></el-input>
                    </el-form-item>
                    <el-form-item label="申请日期" prop="InwareTime" style="margin-right: 5px;">
                        <el-input v-model="userForm.userName"></el-input>
                    </el-form-item>
                    <el-form-item label="申请人" prop="inputerId" style="margin-top:5px;">
                        <el-input v-model="userForm.password"></el-input>
                    </el-form-item>
                    <el-form-item label="业务类型" prop="serviceType" style="margin-top:5px;">
                        <el-select v-model="userForm.sex" placeholder="请选择业务类型">
                            <el-option label="采购入库" value="采购入库"></el-option>
                            <el-option label="生产入库" value="生产入库"></el-option>
                            <el-option label="退料入库" value="退料入库"></el-option>
                            <el-option label="退货入库" value="退货入库"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="来源单号" prop="sourceNo" style="margin-top:5px;">
                        <el-input v-model="userForm.no"></el-input>
                    </el-form-item>
                    <el-form-item label="来源类型" prop="sourceType" style="margin-top:5px;">
                        <el-input v-model="userForm.no"></el-input>
                    </el-form-item>
                    <el-button type="primary" @click="saveUserData">确定</el-button>
                    --- [添加其它同类项] ---
                </el-form>
                <span slot="footer" class="dialog-footer">
                    
                </span> -->
            <!-- 等会填入 table -->
            <el-popover placement="bottom" title="标题" width="200" trigger="click"
                    content="账号名称: kaikai (都是该账户审核)">
                    <el-button slot="reference">入库任务审批顺序</el-button>
            </el-popover>
            <el-table :data="userList" style="width: 100%; margin-top:10px;" border
                :header-cell-style="{ height: '37px', padding: '0' }" :row-style="{ height: '37px' }"
                :cell-style="{ padding: '0' }">
                <el-table-column label="序号" width="80">
                    <template slot-scope="scope">
                        <span>{{ scope.row.id }}</span>
                    </template>
                </el-table-column>
                <!-- 数据区开始 -->
                <el-table-column label="入库单号" width="120" prop="orderNo" />
                <el-table-column label="申请人" width="100" prop="inputerId" v-if="false" />
                <el-table-column label="申请人" width="100" prop="userName" />
                <el-table-column label="业务类型" width="100" prop="serviceType" />
                <el-table-column label="状态" width="100" prop="status" />
                <el-table-column label="来源单号" width="150" prop="sourceNo" />
                <el-table-column label="来源类型" width="100" prop="sourceType" />
                <el-table-column label="申请日期" width="180" prop="requireTime" />
                <el-table-column label="步骤" width="180" prop="step" v-if="false" />
                <!-- 数据去结束 -->
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" type="success" @click="handleEdit(scope.$index, scope.row)">任务明细
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 分页按钮 -->
            <el-pagination background style="margin:15px 45px;" hide-on-single-page @size-change="onSizeChange"
                @current-change="onPageChange" :current-page="pageNo" :page-sizes="[5, 10, 30, 50]"
                :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
            </el-pagination>
            <!-- 添加用户对话框 -->
            <el-dialog title="提示" :visible.sync="showAddBox" width="60%" :before-close="handleClose"
                style="padding: 8px 15px;" @close="onClose">
                <el-form :model="userForm" :inline="true" class="demo-form-inline">
                    <el-form-item label="申请单号" prop="orderNo" style="margin-top:5px;">
                        <el-input v-model="userForm.orderNo" :disabled="true"></el-input><br />
                    </el-form-item>
                    <el-form-item label="申请日期" prop="requireTime" style="margin-top:5px;">
                        <el-input v-model="userForm.requireTime" :disabled="true"></el-input>
                    </el-form-item>
                </el-form>
                <el-form :model="userForm" :inline="true" class="demo-form-inline">
                    <el-form-item label="申请人" prop="userName" style="margin-top:5px;">
                        <el-input v-model="userForm.userName" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="业务类型" prop="serviceType" style="margin-top:5px;">
                        <el-input v-model="userForm.serviceType" :disabled="true"></el-input>
                    </el-form-item>
                </el-form>
                <el-form :model="userForm" :inline="true" class="demo-form-inline">
                    <el-form-item label="来源单号" prop="sourceNo" style="margin-top:5px;">
                        <el-input v-model="userForm.sourceNo" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="来源类型" prop="sourceType" style="margin-top:5px;">
                        <el-input v-model="userForm.sourceType" :disabled="true"></el-input>
                    </el-form-item>
                </el-form>
                <!-- table -->
                <el-table :data="detail" style="width: 100%; margin-top:10px;" border
                    :header-cell-style="{ height: '37px', padding: '0' }" :row-style="{ height: '37px' }"
                    :cell-style="{ padding: '0' }">
                    <el-table-column label="序号" width="80" v-if="false">
                        <template slot-scope="temp">
                            <span>{{ scope.row.id }}</span>
                        </template>
                    </el-table-column>
                    <!-- 数据区开始 -->
                    <el-table-column label="序号" width="120" type="index" />
                    <el-table-column label="物料编码" width="120" prop="meterialNo" />
                    <el-table-column label="物料名称" width="150" prop="meterialName" />
                    <el-table-column label="规格参数" width="180" prop="note" />
                    <el-table-column label="单位" width="100" prop="unit" />
                    <el-table-column label="数量" width="100" prop="count" />
                    <!-- <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button size="mini" type="success" @click="operate(scope.$index, scope.row)">操作
                            </el-button>
                        </template>
                    </el-table-column> -->
                    <!-- 数据去结束 -->
                </el-table>
                <!-- --- [添加其它同类项] --- -->
                <el-steps :active="userForm.step - 2" finish-status="success" align-center>
                    <el-step title="开始"></el-step>
                    <el-step title="打标签"></el-step>
                    <el-step title="QC检验"></el-step>
                    <el-step title="上架" ></el-step>
                    <el-step title="结束"></el-step>
                </el-steps>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="commit('true')" :disabled="this.userForm.step!=3">已打标签</el-button>
                    <el-button @click="commit('true')" :disabled="this.userForm.step!=4">已检验</el-button>
                    <el-button @click="Edit()" :disabled="this.userForm.step!=5">已上架</el-button>
                    <!-- <el-button type="primary" @click="commit('true')">确认完成</el-button> -->
                    <!-- <el-button @click="commit('false')">异常申诉</el-button> -->
                </span>
            </el-dialog>
            <!-- 编辑弹框 -->
            <el-dialog title="提示" :visible.sync="showEditBox" width="60%" :before-close="handleClose"
                style="padding: 8px 15px;" @close="onClose">
                <el-form :model="userInfo" :rules="userFormRules" ref="userFormRef">
                    <el-form-item label="库位" prop="positionNo" style="margin-top:5px;">
                        <el-select v-model="userInfo.positionNo" placeholder="请选择库位">
                            <el-option v-for="item in position" :key="item.value" :label="item.text" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <!-- --- [添加其它同类项] --- -->
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="showEditBox = false">取消</el-button>
                    <el-button type="primary" @click="saveInventory()">确定</el-button>
                </span>
            </el-dialog>

        </el-card>

    </div>
</template>
<script>
// import { getReceiptList } from '../../api/receipt.js'
// import { getList } from '../../api/request.js'
import { commit } from '../../api/inbound.js';
import { getTasktList, getDetailList } from '../../api/inbound';
import { save } from '../../api/inventory.js';
import { getposition } from '@/api/option.js';
export default {
    name: 'userlist',
    data() {
        return {
            showAddBox: false,
            showEditBox: false,
            searchStr: { orderNo: '', requireTime: '', inputerId: '', serviceType: '' },
            pageNo: 1,
            pageSize: 10,
            totalCount: 23,
            userForm: {
                id: '', orderNo: '', serviceType: '', sourceType: '', sourceNo: '', inputerId: '', requireTime: '', userName: '', step: '',
                status: ''
            },
            userInfo: {
                inventoryName: '', meterialNo: '', positionNo: '', count: '', unit: '',note: ''
            },
            // detail: {
            //     orderNo: '', meterialNo: '', meterialName: '', count: '', note: '',unit:''
            // },
            detail: [],
            userFormRules: {
                account: [
                    { required: true, message: '请输入用户帐号', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度:3-10', trigger: 'blur' },
                ]
            },
            // 暂时静态
            userList: [],
            token: {},
            position: [],
        }
    },
    methods: {
        // 后期动态获取
        getList() {
            const param = { page: this.pageNo, limit: this.pageSize }
            getTasktList(param).then(
                resp => {
                    console.log(resp);
                    var ret = resp.result;
                    if (ret == 'success') {
                        this.userList = resp.data.list;
                        this.totalCount = resp.data.total;
                        console.log("userList:");
                        console.log(this.userList);
                    } else {
                        this.$notify.error({
                            title: '获取失败',
                            message: resp.cause
                        });
                    }
                }
            );
        },
        handleEdit(index, row) {
            this.showAddBox = true;
            this.userForm = row;
            var data = { orderNo: this.userForm.orderNo }
            getDetailList(data).then(
                resp => {
                    console.log(resp);
                    var ret = resp.result;
                    if (ret == 'success') {
                        this.detail = resp.data.list;
                    } else {
                        this.$notify.error({
                            title: '获取失败',
                            message: resp.cause
                        });
                    }
                }
            );
        },
        handleDelete(index, row) {
            // this.$confirm('此操作将永久删除, 是否继续?', '提示', {
            //     confirmButtonText: '确定',
            //     cancelButtonText: '取消',
            //     type: 'warning'
            // }).then(() => {
            //     var data = { id: row.id };
            //     // var data =row.id;
            //     console.log(data);
            //     delUser(data).then(
            //         resp => {
            //             console.log(resp);
            //             var ret = resp.result;
            //             if (resp == '') {
            //                 this.$notify({
            //                     title: '删除成功',
            //                     message: '删除用户成功',
            //                     type: 'success'
            //                 });
            //                 setTimeout(location.reload(), 2000);
            //             } else {
            //                 this.$notify.error({
            //                     title: '删除失败',
            //                     message: '这是一条错误的提示消息'
            //                 });
            //                 // setTimeout(location.reload(), 2000);
            //             }

            //         }
            //     );
            // }
            // );

        },
        onSizeChange() {
            this.getList();
        },
        onPageChange(page) {
            this.pageNo = page;
            this.getList();
        },
        handleClose() {
            this.showAddBox = false;
            this.showEditBox = false;
            console.log("id:" + this.userInfo.id);
            // this.userInfo.id === '' ? this.showAddBox = false : this.showEditBox = false;
        },
        onClose() {

        },
        saveInventory() {
            console.log("userInfo:" + this.userInfo.id);
            var data = this.userInfo;
            console.log(data)
            save(data).then(
                resp => {
                    console.log(resp);
                    this.$notify({
                        title: '添加成功',
                        message: '添加用户成功',
                        type: 'success'
                    });
                    
                    // setTimeout(()=>{location.reload()}, 1000);
                }
            );
            this.commit('true');
        },
        getposition() {
            getposition().then(
                resp => {
                    this.position = resp.data;
                }
            );
        },
        getdate() {
            // var date = new Date();
            // var seperator = "-";
            // var year = date.getFullYear();
            // var month = date.getMonth() + 1;
            // var strDate = date.getDate();

            // if (month >= 1 && month <= 9) {
            //     month = "0" + month;
            // }
            // if (strDate >= 0 && strDate <= 9) {
            //     strDate = "0" + strDate;
            // }
            // var currentdate = year + "-" + month + "-" + strDate;
            // console.log(currentdate);
            // this.userForm.requireTime = currentdate;
        },
        getMeterialList() {
            // var me = {meterialNo:this.detail.meterialNo}
            // getMetList(me).then(
            //     resp => {
            //         console.log(resp);
            //         this.metrialList = resp.data.list;

            //     }
            // );
        },
        commit(ret) {
            setTimeout(()=>{location.reload()}, 1000);
            if(ret=='true'){

            }else{
                this.userForm.status='已拒绝';
            }
            console.log(this.userForm);
            console.log("all status:"+this.userForm.status)
            var data = this.userForm;
            commit(data).then(
                resp => {
                    console.log(resp);
                    this.$notify({
                        title: '审批成功',
                        message: '同意申请成功',
                        type: 'success'
                    });
                    setTimeout(location.reload(), 2000);
                }
            );
        },
        Edit(){
            var row=this.detail[0];
            // this.commit('true');
            this.showEditBox = true;
            this.userInfo = row;
            this.userInfo.inventoryName=row.meterialName;
            this.userInfo.id=null;
        },
        operate(index, row) {

        },

        // reloadPage(){
        //     window.location="${ctxPath}/User/viewList";
        // }
    },
    mounted() {
        this.getList();
        this.getposition();
        // this.getdate();
    }
}
</script>
<style scoped>
div.el-breadcrumb {
    height: 30px;
}
</style>