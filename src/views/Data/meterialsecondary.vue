<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>数据管理</el-breadcrumb-item>
            <el-breadcrumb-item>子类别管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-row :gutter="20">
                <el-col :span="4">
                    <el-input placeholder="请输入子类编号" v-model="searchNo" clearableclear="getList">
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-input placeholder="请输入子类名称" v-model="searchName" clearableclear="getList">
                    </el-input>
                </el-col>
                <el-col :span="2">
                    <el-button type="success" @click="getList">立即搜索</el-button>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="showAddBox = true">添加物料子类</el-button>
                </el-col>
                
            </el-row>

            <el-table :data="List" style="width: 100%; margin-top:10px;" border
                :header-cell-style="{ height: '37px', padding: '0' }" :row-style="{ height: '37px' }"
                :cell-style="{ padding: '0' }">
                <el-table-column label="ID" width="80">
                    <template slot-scope="scope">
                        <span>{{ scope.row.id }}</span>
                    </template>
                </el-table-column>
                <!-- 数据区开始 -->
                <el-table-column label="子类编号" width="105" prop="secondaryNo" />
                <el-table-column label="子类名称" width="140" prop="secondaryName" />
                <el-table-column label="子类描述" width="100" prop="typeDesc" />
                <el-table-column label="规则编号" width="100" prop="ruleNo" />
                <el-table-column label="录入者" width="100" prop="userName" />
                <el-table-column label="录入id" width="100" prop="inputerId" v-if="false" />
                <el-table-column label="创建日期" width="100" prop="createDate" />
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
                @current-change="onPageChange" :current-page="pageNo" :page-sizes="[5, 10, 30, 50]" :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
            </el-pagination>
            <!-- 添加对话框 -->
            <el-dialog title="提示" :visible.sync="showAddBox" width="60%" :before-close="handleClose"
                style="padding: 8px 15px;" @close="onClose">
                <el-form :model="Form" :rules="metetrialFormRules" ref="metetrialFormRef">
                    <el-form-item label="子类名称" prop="secondaryName" style="margin-top:5px;">
                        <el-input v-model="Form.secondaryName"></el-input>
                    </el-form-item>
                    <el-form-item label="子类描述" prop="typeDesc" style="margin-top:5px;">
                        <el-input v-model="Form.typeDesc"></el-input>
                    </el-form-item>
                    <el-form-item label="规则编号" prop="ruleNo" style="margin-top:5px;">
                        <el-input v-model="Form.ruleNo"></el-input>
                    </el-form-item>
                    <!-- --- [添加其它同类项] --- -->
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="showAddBox = false">取消</el-button>
                    <el-button type="primary" @click="saveData">确定</el-button>
                </span>
            </el-dialog>
            <!-- 编辑对话框 -->
            <el-dialog title="提示" :visible.sync="showEditBox" width="60%" :before-close="handleClose"
                style="padding: 8px 15px;" @close="onClose">
                <el-form :model="Info" :rules="metetrialFormRules" ref="metetrialFormRef">
                    <el-form-item label="子类编号" prop="secondaryNo" style="margin-top:5px;">
                        <el-input v-model="Info.secondaryNo" :readonly="true"></el-input>
                    </el-form-item>
                    <el-form-item label="子类名称" prop="secondaryName" style="margin-top:5px;">
                        <el-input v-model="Info.secondaryName"></el-input>
                    </el-form-item>
                    <el-form-item label="子类描述" prop="typeDesc" style="margin-top:5px;">
                        <el-input v-model="Info.typeDesc"></el-input>
                    </el-form-item>
                    <el-form-item label="规则编号" prop="ruleNo" style="margin-top:5px;">
                        <el-input v-model="Info.ruleNo"></el-input>
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
import { getList, save, dele } from '@/api/meterialsecondary.js'
export default {
    name: 'meterialsecondary',
    data() {
        return {
            showAddBox: false,
            showEditBox: false,
            pageNo: 1,
            pageSize: 10,
            totalCount: 23,
            searchNo: '',                                     //绑定搜索框
            searchName: '',
            List: [],                                      //存储主要信息
            Form: { secondaryName: '', typeDesc: '', ruleNo: '' }, //添加框信息
            Info: { id:'',secondaryName: '', typeDesc: '', ruleNo: '' },//编辑框信息
            metetrialFormRules: {
            },
        }
    },
    methods: {
        getList() {
            const param = { page: this.pageNo, limit: this.pageSize, secondaryNo: this.searchNo, secondaryName: this.searchName };
            console.log('{MT}param:');
            console.log(param);
            getList(param).then(
                resp => {
                    console.log('主信息')
                    console.log(resp.data)
                    this.List = resp.data.list;
                    this.totalCount = resp.data.total;
                }
            ).catch(
                err => {
                    this.$message({
                        showClose: true,
                        message: '获取失败',
                        type: 'error'
                    });
                }
            )
        },
        saveData() {
            var data = this.Info.id === '' ? this.Form : this.Info;
            console.log(data);
            save(data).then(
                resp => {
                    var result = resp.result;
                    if (result == 'success') {
                        this.$message({
                            showClose: true,
                            message: '添加成功',
                            type: 'success'
                        })
                        setTimeout(() => { location.reload() }, 1000);
                    } else {
                        this.$message({
                            showClose: true,
                            message: '添加失败',
                            type: 'error'
                        })
                    }
                }
            );
        },
        handleEdit(index, row) {
            this.showEditBox = true;
            this.Info = row;
        },
        handleDelete(index,row) {
            this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                var data = { id: row.id };
                // var data =row.id;
                console.log(data);
                dele(data).then(
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
        handleClose() {
            this.showAddBox = false;
            this.showEditBox = false;
            // console.log(this.visible);
            // this.userInfo.id === '' ? this.showAddBox = false : this.showEditBox = false;

        },
        onSizeChange() {
            this.getList();
        },
        onPageChange(page) {
            this.pageNo = page;
            this.getList();
        },
        onClose() {

        },
    },
    mounted() {
        this.getList();
    }
}

</script>