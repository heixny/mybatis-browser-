<template>
    <div>
        <!-- 面包屑地址条 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>出入库管理</el-breadcrumb-item>
            <el-breadcrumb-item>入库申请</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片组件 -->
        <el-card>
            <!-- 搜索栏 -->
            <el-row :gutter="20">
                <el-col :span="8">申请单号
                    <el-input placeholder="请输入单号" v-model="userForm.orderNo" clearableclear="inapplyList">

                    </el-input>
                </el-col>
                <el-col :span="8">申请日期
                    <el-input v-model="userForm.requireTime" clearableclear="inapplyList">

                    </el-input>
                </el-col>
            </el-row>

            <el-row :gutter="20">
                <el-col :span="8">申请人
                    <el-input v-model="userForm.userName" clearableclear="inapplyList">
                    </el-input>
                    <el-input v-model="userForm.inputerId" clearableclear="inapplyList" v-if="false">
                    </el-input>
                </el-col>
                <el-col :span="8">业务类型
                    <el-select v-model="userForm.serviceType" placeholder="请选择业务类型">
                        <el-option label="采购入库" value="采购入库"></el-option>
                        <el-option label="生产入库" value="生产入库"></el-option>
                        <el-option label="退料入库" value="退料入库"></el-option>
                        <el-option label="退货入库" value="退货入库"></el-option>
                    </el-select>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="8">来源单号
                    <el-input placeholder="请输入来源单号" v-model="userForm.sourceNo" clearableclear="inapplyList">

                    </el-input>
                </el-col>
                <el-col :span="8">来源类型
                    <el-select v-model="userForm.sourceType" placeholder="请选择来源类型">
                        <el-option label="采购订购单" value="采购订购单"></el-option>
                        <el-option label="生产入库单" value="生产入库单"></el-option>
                        <el-option label="退料单" value="退料单"></el-option>
                        <el-option label="退货单" value="退货单"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="showAddBox = true">
                        添加入库项目
                    </el-button>
                </el-col>
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
                    content="账号名称: andy(提交申请的账户名) -> candy -> kailen">
                    <el-button slot="reference">入库单审批顺序</el-button>
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
                <el-table-column label="物料编码" width="180" prop="meterialNo" />
                <el-table-column label="物料名称" width="180" prop="meterialName" />
                <el-table-column label="规格参数" width="180" prop="note" />
                <el-table-column label="单位" width="180" prop="unit" />
                <el-table-column label="数量" width="180" prop="count" />
                <!-- 数据去结束 -->
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>

            </el-table>
            <el-row type="flex" justify="center">
                <el-button type="success" @click="saveOrder">确认申请</el-button>
            </el-row>

            <!-- 分页按钮 -->
            <el-pagination background style="margin:15px 45px;" hide-on-single-page @size-change="onSizeChange"
                @current-change="onPageChange" :current-page="pageNo" :page-sizes="[5, 10, 30, 50]" :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
            </el-pagination>
            <!-- 添加用户对话框 -->
            <el-dialog title="提示" :visible.sync="showAddBox" width="60%" :before-close="handleClose"
                style="padding: 8px 15px;" @close="onClose">
                <el-form :model="detail">
                    <el-form-item label="物料编码" prop="meterialNo" style="margin-top:5px;">
                        <el-input v-model="detail.meterialNo" style="width:70%"></el-input><br />
                        <el-button size="mini" @click="getMeterialList">查询</el-button>
                    </el-form-item>
                    <el-form-item label="数量" prop="count" style="margin-top:5px;">
                        <el-input v-model="detail.count" style="width:70%"></el-input>
                    </el-form-item>
                    <el-form-item label="单位" prop="unit" style="margin-top:5px;">
                        <el-input v-model="detail.unit" style="width:70%"></el-input>
                    </el-form-item>
                    <!-- table -->物料信息
                    <el-table :data="metrialList" style="width: 100%; margin-top:10px;" border
                        :header-cell-style="{ height: '37px', padding: '0' }" :row-style="{ height: '37px' }"
                        :cell-style="{ padding: '0' }">
                        <el-table-column label="序号" width="80">
                            <template slot-scope="temp">
                                <span>{{ temp.row.id }}</span>
                            </template>
                        </el-table-column>
                        <!-- 数据区开始 -->
                        <el-table-column label="物料编码" width="180" prop="meterialNo" />
                        <el-table-column label="物料名称" width="180" prop="meterialName" />
                        <el-table-column label="规格参数" width="180" prop="specification" />
                        <!-- 数据去结束 -->
                        <el-table-column label="操作">
                            <template slot-scope="temp">
                                <el-button size="mini" @click="selectRow(temp.$index, temp.row)">选择</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!-- --- [添加其它同类项] --- -->
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="showAddBox = false">取消</el-button>
                    <el-button type="primary" @click="saveData">确定</el-button>
                </span>
            </el-dialog>
            <!-- 编辑弹框 -->
            <el-dialog title="提示" :visible.sync="showEditBox" width="60%" :before-close="handleClose"
                style="padding: 8px 15px;" @close="onClose">
                <el-form :model="userInfo" :rules="userFormRules" ref="userFormRef">
                    <el-form-item label="物料编码(只读)" prop="meterialNo" style="margin-top:5px;">
                        <el-input v-model="userInfo.meterialNo" :readonly="true"></el-input>
                    </el-form-item>
                    <el-form-item label="物料名称(只读)" prop="meterialName" style="margin-top:5px;">
                        <el-input v-model="userInfo.meterialName" :readonly="true"></el-input>
                    </el-form-item>
                    <el-form-item label="规格参数" prop="note" style="margin-top:5px;">
                        <el-input v-model="userInfo.note"></el-input>
                    </el-form-item>
                    <el-form-item label="单位" prop="unit" style="margin-top:5px;">
                        <el-input v-model="userInfo.unit"></el-input>
                    </el-form-item>
                    <el-form-item label="数量" prop="count" style="margin-top:5px;">
                        <el-input v-model="userInfo.count"></el-input>
                    </el-form-item>
                    <!-- --- [添加其它同类项] --- -->
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="showEditBox = false">取消</el-button>
                    <el-button type="primary" @click="saveData">确定</el-button>
                </span>
            </el-dialog>

        </el-card>

    </div>
</template>
<script>
import { getList } from '../../api/request.js'
import { getMetList } from '../../api/meterial.js'
import { saveDetail, delDetail } from '../../api/request.js'
import { startProc, getUser } from '../../api/request.js'
export default {
    name: 'userlist',
    data() {
        return {
            showAddBox: false,
            showEditBox: false,
            searchStr: '',
            pageNo: 1,
            pageSize: 10,
            totalCount: 23,
            userForm: {
                id: '', orderNo: 'IWOND', serviceType: '', sourceType: '', sourceNo: 'IWANNA', inputerId: '', requireTime: '', userName: '', step: '3'
            },
            userInfo: {
                id: '', meterialNo: '', meterialName: '', count: '', note: '', unit: ''
            },
            detail: {
                orderNo: '', meterialNo: '', meterialName: '', count: '', note: '', unit: ''
            },
            meterial: { meterialNo: '', meterialName: '', specification: '' },
            userFormRules: {
                account: [
                    { required: true, message: '请输入用户帐号', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度:3-10', trigger: 'blur' },
                ]
            },
            // 暂时静态
            userList: [],
            metrialList: [],
            input: '账号名:andy -> candy -> kailen'
        }
    },
    methods: {
        // 后期动态获取
        getList() {
            const param = { page: this.pageNo, limit: this.pageSize, orderNo: this.userForm.orderNo }
            getList(param).then(
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
            this.showEditBox = true;
            this.userInfo = row;
        },
        handleDelete(index, row) {
            this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                var data = { id: row.id };
                // var data =row.id;
                console.log(data);
                delDetail(data).then(
                    resp => {
                        console.log(resp);
                        var ret = resp.result;
                        if (ret == 'success') {
                            this.$message({
                                showClose: true,
                                message: '删除成功',
                                type: 'success'
                            })
                            setTimeout(() => { location.reload() }, 1000);
                        } else {
                            this.$message({
                                showClose: true,
                                message: '删除失败',
                                type: 'error'
                            })
                            // setTimeout(location.reload(), 2000);
                        }
                    }
                );
            }
            );
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
        // 获取日期
        getdate() {
            var date = new Date();
            var seperator = "-";
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var strDate = date.getDate();

            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            var currentdate = year + "-" + month + "-" + strDate;
            console.log(currentdate);
            this.userForm.requireTime = currentdate;
        },
        // 获取物料列表
        getMeterialList() {
            var me = { meterialNo: this.detail.meterialNo }
            getMetList(me).then(
                resp => {
                    console.log(resp);
                    this.metrialList = resp.data.list;

                }
            );
        },
        // detail: {
        //         orderNo: '', meterialNo: '', meterialName: '', count: '', note: ''
        // 选择哪一行物料
        selectRow(index, row) {

            this.showAddBox = true;
            this.detail.orderNo = this.userForm.orderNo
            this.detail.note = row.specification;
            this.detail.meterialNo = row.meterialNo;
            console.log(this.detail);
        },
        // 保存入库项目
        saveData() {
            var data = this.userInfo.id === '' ? this.detail : this.userInfo;
            console.log(data)
            saveDetail(data).then(
                resp => {
                    console.log(resp);
                    this.$notify({
                        title: '添加成功',
                        message: '添加用户成功',
                        type: 'success'
                    });
                    setTimeout(() => { location.reload() }, 1000);
                }
            );
        },
        // 保存入库单
        saveOrder() {
            console.log(this.userForm);
            var data = this.userForm
            console.log(data)
            startProc(data).then(
                resp => {
                    console.log(resp);
                    this.$notify({
                        title: '添加成功',
                        message: '添加用户成功',
                        type: 'success'
                    });
                    setTimeout(location.reload(), 2000);
                }
            );
        },
        getUser() {
            getUser().then(
                resp => {
                    console.log(resp.data)
                    this.userForm.inputerId = resp.data.id;
                    this.userForm.userName = resp.data.userName;
                }
            )
        },
        getRandom(){
            var orderNo='';
            for(let i=0;i<5;i++){
                orderNo=orderNo+Math.floor(Math.random()*10);
            }
            this.userForm.orderNo=this.userForm.orderNo+orderNo;
            this.userForm.sourceNo=this.userForm.sourceNo+orderNo;
        }
        // reloadPage(){
        //     window.location="${ctxPath}/User/viewList";
        // }
    },
    mounted() {
        this.getRandom();
        this.getList();
        this.getdate();
        this.getUser();
    }
}
</script>
<style scoped>
div.el-breadcrumb {
    height: 30px;
}
</style>