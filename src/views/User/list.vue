<template>
    <div>
        <!-- 面包屑地址条 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片组件 -->
        <el-card>
            <!-- 搜索栏 -->
            <el-row :gutter="20">
                <el-col :span="4">
                    <el-input placeholder="请输入账户" v-model="searchacc" clearableclear="getUserList">
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-input placeholder="请输入用户名" v-model="searchuname" clearableclear="getUserList">
                    </el-input>
                </el-col>
                <el-col :span="2">
                    <el-button type="success" @click="getUserList">立即搜索</el-button>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="showAddBox = true">添加用户</el-button>
                </el-col>
            </el-row>
            <!-- 等会填入 table -->
            <el-table :data="userList" style="width: 100%; margin-top:10px;" border
                :header-cell-style="{ height: '37px', padding: '0' }" :row-style="{ height: '37px' }"
                :cell-style="{ padding: '0' }">
                <el-table-column label="用户编号" width="80">
                    <template slot-scope="scope">
                        <span>{{ scope.row.id }}</span>
                    </template>
                </el-table-column>
                <!-- 数据区开始 -->
                <el-table-column label="用户帐号" width="180" prop="account" />
                <el-table-column label="用户名" width="180" prop="userName" />
                <el-table-column label="工号" width="180" prop="no" />
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
                    <el-form-item label="用户帐号" prop="account" style="margin-top:5px;">
                        <el-input v-model="userForm.account"></el-input>
                    </el-form-item>
                    <el-form-item label="用户名" prop="userName" style="margin-top:5px;">
                        <el-input v-model="userForm.userName"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password" style="margin-top:5px;">
                        <el-input v-model="userForm.password"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" prop="sex" style="margin-top:5px;">
                        <el-select v-model="userForm.sex">
                            <el-option label="请选择性别" value=""></el-option>
                            <el-option label="男" value="男"></el-option>
                            <el-option label="女" value="女"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="工号" prop="no" style="margin-top:5px;">
                        <el-input v-model="userForm.no"></el-input>
                    </el-form-item>

                    <!-- --- [添加其它同类项] --- -->
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="showAddBox = false">取消</el-button>
                    <el-button type="primary" @click="saveUserData">确定</el-button>
                </span>
            </el-dialog>
            <!-- 编辑弹框 -->
            <el-dialog title="提示" :visible.sync="showEditBox" width="60%" :before-close="handleClose"
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
import { getUserList } from '../../api/user.js'
import { delUser } from '../../api/user.js'
import { saveUser } from '../../api/adduser.js'
export default {
    name: 'userlist',
    data() {
        return {
            showAddBox: false,
            showEditBox: false,
            searchacc: '',
            searchuname: '',
            pageNo: 1,
            pageSize: 10,
            totalCount: 23,
            userForm: {
                id: '', account: '', password: '', userName: '', sex: '', no: ''
            },
            userInfo: {
                id: '', account: '', password: '', userName: '', sex: '', no: ''
            },
            userFormRules: {
                account: [
                    { required: true, message: '请输入用户帐号', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度:3-10', trigger: 'blur' },
                ]
            },
            // 暂时静态
            userList: []
        }
    },
    methods: {
        // 后期动态获取
        getUserList() {
            const param = { page: this.pageNo, limit: this.pageSize,account:this.searchacc,userName:this.searchuname };
            getUserList(param).then(
                resp => {
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
                delUser(data).then(
                    resp => {
                        console.log('resp:')
                        console.log(resp);
                        var ret = resp.result;
                        if (ret == 'success') {
                            this.$notify({
                                title: '删除成功',
                                message: '删除用户成功',
                                type: 'success'
                            });
                            setTimeout(()=>{location.reload()}, 2000);
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
            this.getUserList();
        },
        onPageChange(page) {
            this.pageNo = page;
            this.getUserList();
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
            console.log('{save}');
            console.log(data)
            saveUser(data).then(
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
        // reloadPage(){
        //     window.location="${ctxPath}/User/viewList";
        // }
    },
    mounted() {
        this.getUserList();
    }
}
</script>
<style scoped>
div.el-breadcrumb {
    height: 30px;
}
</style>