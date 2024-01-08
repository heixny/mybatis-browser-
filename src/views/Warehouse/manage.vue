<template>
    <div>
        <!-- 面包屑地址条 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>仓库管理</el-breadcrumb-item>
            <el-breadcrumb-item>仓库列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片组件 -->
        <el-card>
            <!-- 搜索栏 -->
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-input placeholder="请输入仓库编号" v-model="searchNo" clearableclear="getList">
                        <el-button slot="append" icon="el-icon-search" @click="getList"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="showAddBox = true">添加仓库</el-button>
                </el-col>
            </el-row>
            <!-- 等会填入 table -->
            <el-table :data="userList" style="width: 100%; margin-top:10px;" border
                :header-cell-style="{ height: '37px', padding: '0' }" :row-style="{ height: '37px' }"
                :cell-style="{ padding: '0' }">
                <el-table-column label="ID" width="80">
                    <template slot-scope="scope">
                        <span>{{ scope.row.id }}</span>
                    </template>
                </el-table-column>
                <!-- 数据区开始 -->
                <el-table-column label="仓库代码" width="180" prop="wareNo" />
                <el-table-column label="仓库名称" width="180" prop="wareName" />
                <el-table-column label="类型代码" width="180" prop="typeNo" v-if="false" />
                <el-table-column label="仓库类型" width="180" prop="typeName" />
                <el-table-column label="录入者编号" width="180" prop="inputerId" v-if="false"/>
                <el-table-column label="录入者" width="180" prop="userName" />
                <el-table-column label="创建日期" width="180" prop="createDate" />
                <!-- 数据去结束 -->
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
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
                <el-form :model="userForm" :rules="userFormRules" ref="userFormRef">
                    <el-form-item label="仓库编号" prop="wareNo" style="margin-top:5px;">
                        <el-input v-model="userForm.wareNo"></el-input>
                    </el-form-item>
                    <el-form-item label="仓库名称" prop="wareName" style="margin-top:5px;">
                        <el-input v-model="userForm.wareName"></el-input>
                    </el-form-item>
                    <el-form-item label="仓库类型" prop="typeNo" style="margin-top:5px;">
                        <el-select v-model="userForm.typeNo">
                            <el-option v-for="item in wareType" :key="item.value" :label="item.typeName" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="仓库描述" prop="wareDesc" style="margin-top:5px;">
                        <el-input v-model="userForm.wareDesc"></el-input>
                    </el-form-item>
                    <el-form-item label="录入者" prop="inputerId" style="margin-top:5px;">
                        <el-input v-model="userForm.inputerId" :readonly="true"></el-input>
                    </el-form-item>

                    <!-- --- [添加其它同类项] --- -->
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="showAddBox = false">取消</el-button>
                    <el-button type="primary" @click="saveUserData">确定</el-button>
                </span>
            </el-dialog>
            <!--  id: '', wareNo: '', wareName: '', typeNo: '', wareDesc: '', inputerId: '' -->
            <!-- 编辑弹框 -->
            <el-dialog title="提示" :visible.sync="showEditBox" width="60%" :before-close="handleClose"
                style="padding: 8px 15px;" @close="onClose">
                <el-form :model="userInfo">
                    <el-form-item label="仓库编号" prop="wareNo" style="margin-top:5px;">
                        <el-input v-model="userInfo.wareNo"></el-input>
                    </el-form-item>
                    <el-form-item label="仓库名称" prop="wareName" style="margin-top:5px;">
                        <el-input v-model="userInfo.wareName"></el-input>
                    </el-form-item>
                    <el-form-item label="仓库类型" prop="typeNo" style="margin-top:5px;">
                        <el-select v-model="userInfo.typeNo">
                            <el-option v-for="item in wareType" :key="item.value" :label="item.typeName" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="仓库描述" prop="wareDesc" style="margin-top:5px;">
                        <el-input v-model="userInfo.wareDesc"></el-input>
                    </el-form-item>

                    <!-- --- [添加其它同类项] --- -->
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="showEditBox = false">取消</el-button>
                    <el-button type="primary" @click="saveUserData">确定</el-button>
                </span>
            </el-dialog>

        </el-card>

    </div>
</template>
<script>
import { getList,saveWarehouse,delWarehouse,getUserId } from '../../api/manage.js'
// import { delUser } from '../../api/user.js'
// import { saveUser } from '../../api/adduser.js'
import { getwaretype } from '@/api/option.js'
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
                id: null, wareNo: '', wareName: '', typeNo: '', wareDesc: '', inputerId: ''
            },
            userInfo: {
                id: '', wareNo: '', wareName: '', typeNo: '', wareDesc: '', no: ''
            },
            userFormRules: {
                account: [
                    { required: true, message: '请输入用户帐号', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度:3-10', trigger: 'blur' },
                ]
            },
            // 暂时静态
            userList: [],
            wareType: []
        }
    },
    methods: {
        // 后期动态获取
        getList() {
            const param = { page: this.pageNo, limit: this.pageSize, wareNo: this.searchNo}
            getList(param).then(
                resp => {
                    console.log(resp);
                    this.userList = resp.data.list;
                    this.totalCount = resp.data.total;

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
                delWarehouse(data).then(
                    resp => {
                        console.log(resp);
                        var ret = resp.result;
                        if (ret == 'success') {
                            this.$notify({
                                title: '删除成功',
                                message: '删除用户成功',
                                type: 'success'
                            });
                            setTimeout(location.reload(), 2000);
                        } else {
                            this.$notify.error({
                                title: '删除失败',
                                message: '这是一条错误的提示消息'
                            });
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
            console.log("id:"+this.userInfo.id);
            // this.userInfo.id === '' ? this.showAddBox = false : this.showEditBox = false;
        },
        onClose() {

        },
        saveUserData() {
            console.log("userInfo:" + this.userInfo.id);
            var data = this.userInfo.id === '' ? this.userForm : this.userInfo;
            // var data=this.userForm;
            console.log(data)
            saveWarehouse(data).then(
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
        getwaretype() {
            getwaretype().then(
                resp => {
                    console.log(resp);
                    this.wareType = resp.data;
                    console.log(this.wareType);
                }
            );
        },
        getUserId(){
            getUserId().then(
                resp=>{
                    console.log(resp.userId);
                    this.userForm.inputerId=resp.userId;
                }
            )
        }
        // reloadPage(){
        //     window.location="${ctxPath}/User/viewList";
        // }
    },
    mounted() {
        this.getList();
        this.getwaretype();
        this.getUserId();
    }
}
</script>
<style scoped>
div.el-breadcrumb {
    height: 30px;
}
</style>