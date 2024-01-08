<template>
    <div>
        <!-- 面包屑地址条 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>出入库管理</el-breadcrumb-item>
            <el-breadcrumb-item>我的申请</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片组件 -->
        <el-card>
            <!-- 搜索栏 -->
            <el-row :gutter="20">
                <el-col :span="4">
                    <el-input placeholder="请输入入库单编号" v-model="searchNo" clearableclear="getList">
                    </el-input>
                </el-col>
                <el-col :span="2">
                    <el-button type="success" @click="getList">立即搜索</el-button>
                </el-col>
            </el-row>
            <!-- 等会填入 table -->
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
                <el-table-column label="审批id" width="100" prop="receiverId" v-if="false" />
                <el-table-column label="审批者" width="100" prop="userName" />
                <el-table-column label="业务类型" width="100" prop="serviceType" />
                <el-table-column label="状态" width="100" prop="status" />
                <el-table-column label="来源单号" width="150" prop="sourceNo" />
                <el-table-column label="来源类型" width="100" prop="sourceType" />
                <el-table-column label="申请日期" width="180" prop="requireTime" />
                <el-table-column label="步骤" width="180" prop="step"/>
                <!-- 数据去结束 -->
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" type="success" @click="handleEdit(scope.$index, scope.row)">入库单明细
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
                    <el-table-column label="序号" width="80">
                        <template slot-scope="temp">
                            <span>{{ temp.row.id }}</span>
                        </template>
                    </el-table-column>
                    <!-- 数据区开始 -->
                    <el-table-column label="物料编码" width="120" prop="meterialNo" />
                    <el-table-column label="物料名称" width="150" prop="meterialName" />
                    <el-table-column label="规格参数" width="180" prop="note" />
                    <el-table-column label="单位" width="100" prop="unit" />
                    <el-table-column label="数量" width="100" prop="count" />
                    <!-- 数据去结束 -->
                </el-table>
                <!-- --- [添加其它同类项] --- -->
                <el-steps :active="userForm.step-1" finish-status="success" align-center>
                    <el-step title="开始" description="这是一段很长很长很长的描述性文字"></el-step>
                    <el-step title="andy提交申请" description="这是一段很长很长很长的描述性文字"></el-step>
                    <el-step title="candy审批" description="这段就没那么长了"></el-step>
                    <el-step title="kailen审批" description="这段就没那么长了"></el-step>
                    <el-step title="结束" description="这段就没那么长了"></el-step>
                </el-steps>
            </el-dialog>
            <!-- 编辑弹框 -->
            <!-- <el-dialog title="提示" :visible.sync="showEditBox" width="60%" :before-close="handleClose"
                style="padding: 8px 15px;" @close="onClose">
                <el-form :model="userInfo" :rules="userFormRules" ref="userFormRef">
                    <el-form-item label="用户帐号" prop="account" style="margin-top:5px;">
                        <el-input v-model="userInfo.account"></el-input>
                    </el-form-item>
                    <el-form-item label="用户名" prop="userName" style="margin-top:5px;">
                        <el-input v-model="userInfo.userName"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password" style="margin-top:5px;">
                        <el-input v-model="userInfo.password"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" prop="sex" style="margin-top:5px;">
                        <el-select v-model="userInfo.sex">
                            <el-option label="请选择性别" value=""></el-option>
                            <el-option label="男" value="男"></el-option>
                            <el-option label="女" value="女"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="工号" prop="no" style="margin-top:5px;">
                        <el-input v-model="userInfo.no"></el-input>
                    </el-form-item>

                    --- [添加其它同类项] ---
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="showEditBox = false">取消</el-button>
                    <el-button type="primary" @click="saveUserData">确定</el-button>
                </span>
            </el-dialog> -->

        </el-card>

    </div>
</template>
<script>
import { getReceiptList,getMyorderList } from '../../api/receipt.js'
import { getList } from '../../api/request.js'
import { commit } from '../../api/receipt.js'
export default {
    name: 'userlist',
    data() {
        return {
            showAddBox: false,
            showEditBox: false,
            searchNo: '',
            pageNo: 1,
            pageSize: 10,
            totalCount: 23,
            userForm: {
                id: '', orderNo: '', serviceType: '', sourceType: '', sourceNo: '', receiverId: '', requireTime: '', userName: '', step: '',
                status:''
            },
            userInfo: {
                id: '', account: '', password: '', userName: '', sex: '', no: ''
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
        }
    },
    methods: {
        // 后期动态获取
        getList() {
            const param = { page: this.pageNo, limit: this.pageSize }
            getMyorderList(param).then(
                resp => {
                    console.log(resp);
                    var ret = resp.result;
                    if (ret == 'success') {
                        this.userList = resp.data.list;
                        this.totalCount = resp.data.total;
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
            getList(data).then(
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
            // this.showEditBox = false;
            console.log("id:" + this.userInfo.id);
            // this.userInfo.id === '' ? this.showAddBox = false : this.showEditBox = false;
        },
        onClose() {

        },
        saveUserData() {
            // console.log("userInfo:" + this.userInfo.id);
            // var data = this.userInfo.id === '' ? this.userForm : this.userInfo;
            // console.log(data)
            // saveUser(data).then(
            //     resp => {
            //         console.log(resp);
            //         this.$notify({
            //             title: '添加成功',
            //             message: '添加用户成功',
            //             type: 'success'
            //         });
            //         setTimeout(location.reload(), 2000);
            //     }
            // );
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
        // detail: {
        //         orderNo: '', meterialNo: '', meterialName: '', count: '', note: ''
        selectRow(index, row) {

            // this.showAddBox = true;
            // this.detail.orderNo=this.userForm.orderNo
            // this.detail.note=row.specification;
            // this.detail.meterialNo=row.meterialNo;
            // console.log(this.detail);
        },
        saveOrder() {
            // console.log(this.userForm);
            // var data = this.userForm
            // console.log(data)
            // startProc(data).then(
            //     resp => {
            //         console.log(resp);
            //         this.$notify({
            //             title: '添加成功',
            //             message: '添加用户成功',
            //             type: 'success'
            //         });
            //         setTimeout(location.reload(), 2000);
            //     }
            // );
        },
        commit(ret) {
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
        }
        // reloadPage(){
        //     window.location="${ctxPath}/User/viewList";
        // }
    },
    mounted() {
        this.getList();
        // this.getdate();
    }
}
</script>
<style scoped>
div.el-breadcrumb {
    height: 30px;
}
</style>