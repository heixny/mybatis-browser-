<template>
    <div>
        <!-- 面包屑地址条 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>数据管理</el-breadcrumb-item>
            <el-breadcrumb-item>物料主数据</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片组件 -->
        <el-card>
            <!-- 搜索栏 -->
            <el-row :gutter="20">
                <el-col :span="4">
                    <el-input placeholder="请输入物料编号" v-model="searchNo" clearableclear="getMeterialList">
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-input placeholder="请输入物料名称" v-model="searchName" clearableclear="getMeterialList">
                    </el-input>
                </el-col>
                <el-col :span="2">
                    <el-button type="success" @click="getMeterialList">立即搜索</el-button>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="showAddBox = true">添加物料</el-button>
                </el-col>
            </el-row>
            <!-- 等会填入 table -->
            <el-table :data="meterialList" style="width: 100%; margin-top:10px;" border
                :header-cell-style="{ height: '37px', padding: '0' }" :row-style="{ height: '37px' }"
                :cell-style="{ padding: '0' }">
                <el-table-column label="ID" width="80">
                    <template slot-scope="scope">
                        <span>{{ scope.row.id }}</span>
                    </template>
                </el-table-column>
                <!-- 数据区开始 -->
                <el-table-column label="物料编号" width="105" prop="meterialNo" />
                <el-table-column label="物料名称" width="140" prop="meterialName" />
                <el-table-column label="物料主类型编号" width="100" prop="typeNo" v-if="false" />
                <el-table-column label="物料主类型" width="100" prop="meterialType.typeName" />
                <el-table-column label="主类型编码" width="100" prop="meterialType.ruleNo" v-if="false" />
                <el-table-column label="次级编号" width="100" prop="secondaryNo" v-if="false" />
                <el-table-column label="次级类型" width="100" prop="meterialSecondary.secondaryName" />
                <el-table-column label="次级编码" width="100" prop="meterialSecondary.ruleNo" v-if="false" />
                <el-table-column label="物料组编号" width="100" prop="groupNo" v-if="false" />
                <el-table-column label="物料组" width="100" prop="meterialGroup.groupName" />
                <el-table-column label="组编码" width="100" prop="meterialGroup.ruleNo" v-if="false" />
                <el-table-column label="物料规格" width="150" prop="specification" />
                <el-table-column label="录入者" width="100" prop="user.userName" />
                <el-table-column label="创建日期" width="100" prop="createDate" />
                <!-- 数据去结束 -->
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
                        <el-button size="mini" type="warning" @click="handleDelete(scope.$index, scope.row)">查看供应商
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
            <!--  id: '', meterialNo: '', meterialName: '',typeNo:'',typeName:'', groupNo:'',
                groupName:'',secondaryNo:'',secondaryName:'',specification:'',inputerId:'',createDate:''
            }, -->
            <el-dialog title="提示" :visible.sync="showAddBox" width="60%" :before-close="handleClose"
                style="padding: 8px 15px;" @close="onClose">
                <el-form :model="metetrialForm" :rules="metetrialFormRules" ref="metetrialFormRef">
                    <el-form-item label="物料主类型" prop="meterialType.ruleNo" style="margin-top:5px;">
                        <el-select v-model="metetrialForm.meterialType.ruleNo" placeholder="请选择类型">
                            <el-option v-for="item in types" :key="item.value" :label="item.typeName" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="次级类型" prop="meterialSecondary.ruleNo" style="margin-top:5px;">
                        <el-select v-model="metetrialForm.meterialSecondary.ruleNo" placeholder="请选择类型">
                            <el-option v-for="item in secondary" :key="item.value" :label="item.secondaryName" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="物料组类型" prop="meterialGroup.ruleNo" style="margin-top:5px;">
                        <el-select v-model="metetrialForm.meterialGroup.ruleNo"  placeholder="请选择类型">
                            <el-option v-for="item in groups" :key="item.value" :label="item.groupName" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="物料编号" prop="meterialNo" style="margin-top:5px;">
                        <el-input v-model="res" :readonly="true"></el-input>
                    </el-form-item>
                    <el-form-item label="物料名称" prop="meterialName" style="margin-top:5px;">
                        <el-input v-model="metetrialForm.meterialName"></el-input>
                    </el-form-item>
                    <el-form-item label="物料规格" prop="specification" style="margin-top:5px;">
                        <el-input v-model="metetrialForm.specification"></el-input>
                    </el-form-item>
                    <el-form-item label="状态" prop="status" style="margin-top:5px;">
                        <el-select v-model="metetrialForm.status"  placeholder="请选择状态">
                            <el-option label="启用" value="启用"></el-option>
                        </el-select>
                    </el-form-item>
                    <!-- <el-form-item label="备注" prop="no" style="margin-top:5px;">
                        <el-input v-model="metetrialForm.no"></el-input>
                    </el-form-item> -->

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
                <el-form :model="userInfo" :rules="metetrialFormRules" ref="metetrialFormRef">
                    <el-form-item label="物料编号" prop="meterialNo" style="margin-top:5px;">
                        <el-input v-model="userInfo.meterialNo" readonly="true"></el-input>
                    </el-form-item>
                    <el-form-item label="物料名称" prop="meterialName" style="margin-top:5px;">
                        <el-input v-model="userInfo.meterialName"></el-input>
                    </el-form-item>
                    <el-form-item label="物料主类型" prop="typeNo" style="margin-top:5px;">
                        <el-select v-model="userInfo.typeNo" placeholder="请选择类型">
                            <el-option v-for="item in types" :key="item.typeNo" :label="item.typeName" :value="item.typeNo">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    
                    <el-form-item label="次级类型" prop="secondaryNo" style="margin-top:5px;">
                        <el-select v-model="userInfo.secondaryNo" placeholder="请选择类型">
                            <el-option v-for="item in secondary" :key="item.secondaryNo" :label="item.secondaryName" :value="item.secondaryNo">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="物料组类型" prop="groupNo" style="margin-top:5px;">
                        <el-select v-model="userInfo.groupNo" placeholder="请选择类型">
                            <el-option v-for="item in groups" :key="item.groupNo" :label="item.groupName" :value="item.groupNo">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="物料规格" prop="specification" style="margin-top:5px;">
                        <el-input type="textarea" :rows="3" v-model="userInfo.specification"></el-input>
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
import { getMeterialList } from '../../api/meterial.js'
import { getMT,getMS,getMG } from '../../api/option';
import { delMeterial } from '../../api/meterial.js'
import { saveMeterial } from '../../api/meterial'
export default {
    name: 'meterial',
    data() {
        return {
            showAddBox: false,
            showEditBox: false,
            searchNo: '',
            searchName: '',
            pageNo: 1,
            pageSize: 10,
            totalCount: 23,
            metetrialForm: {
                id: '', meterialNo: '', meterialName: '', typeNo: '',meterialType:{ruleNo:''},status:''
                , typeName: '', groupNo: '',meterialSecondary:{ruleNo:''},meterialGroup:{ruleNo:''},
                groupName: '', secondaryNo: '', secondaryName: '', specification: '', inputerId: '', createDate: ''
            },
            userInfo: {
                id: '', meterialNo: '', meterialName: '', typeNo: '', typeName: '', groupNo: '',
                groupName: '', secondaryNo: '', secondaryName: '', specification: '', inputerId: '', createDate: ''
            },
            metetrialFormRules: {
                account: [
                    { required: true, message: '请输入用户帐号', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度:3-10', trigger: 'blur' },
                ]
            },
            // 暂时静态
            meterialList: [],
            types:[],
            secondary:[],
            groups:[],
            water:''
        }
    },
    methods: {
        // 后期动态获取
        getMeterialList() {
            const param = { page: this.pageNo, limit: this.pageSize,
                meterialNo: this.searchNo,meterialName: this.searchName };
            console.log(param);
            getMeterialList(param).then(
                resp => {
                    console.log(resp);
                    this.meterialList = resp.data.list;
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
                delMeterial(data).then(
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
            this.getMeterialList();
        },
        onPageChange(page) {
            this.pageNo = page;
            this.getMeterialList();
        },
        handleClose() {
            this.showAddBox = false;
            this.showEditBox = false;
            // console.log(this.visible);
            // this.userInfo.id === '' ? this.showAddBox = false : this.showEditBox = false;

        },
        onClose() {

        },
        saveUserData() {
            this.getNo();
            console.log("userInfo:" + this.userInfo.id);
            var data = this.userInfo.id === '' ? this.metetrialForm : this.userInfo;
            console.log(data)
            saveMeterial(data).then(
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
        getMT() {
            getMT().then(
                resp => {
                    console.log(resp);
                    this.types = resp.data;
                    console.log(this.types);
                }
            );
        },
        getMS() {
            getMS().then(
                resp => {
                    console.log(resp);
                    this.secondary = resp.data;
                    console.log(this.secondary);
                }
            );
        },
        getMG() {
            getMG().then(
                resp => {
                    console.log(resp);
                    this.groups = resp.data;
                    console.log(this.groups);
                }
            );
        },
        getcode(){
            let code='';
            for(let i=0;i<5;i++){
                let index=Math.floor(Math.random()*9);
                code+=index;
            }
            this.water=code;
        },
        getNo(){
            // types:[],
            // secondary:[],
            // groups:[],
            let c=this.types.length;
            let g=this.groups.length;
            let s=this.secondary.length
            console.log("length:"+c);
            console.log(this.groups[2].value)
            for(let i=0;i<s;i++){
                if(i<c){
                    if(this.metetrialForm.meterialType.ruleNo.includes(this.types[i].value)){
                        this.metetrialForm.typeNo=this.types[i].typeNo;
                    }
                }
                
                if(i<g){
                    if(this.metetrialForm.meterialGroup.ruleNo.includes(this.groups[i].value)){
                        this.metetrialForm.groupNo=this.groups[i].groupNo;
                    }
                }
                if(this.metetrialForm.meterialSecondary.ruleNo.includes(this.secondary[i].value)){
                    this.metetrialForm.secondaryNo=this.secondary[i].secondaryNo;
                }
            }
        }
        
        // reloadPage(){
        //     window.location="${ctxPath}/User/viewList";
        // }
    },
    mounted() {
        this.getMeterialList();
        this.getMT();
        this.getMG();
        this.getMS();
        this.getcode();
    },
    computed:{
        res(){
            
            this.metetrialForm.meterialNo=this.metetrialForm.meterialType.ruleNo+this.metetrialForm.meterialSecondary.ruleNo
            +this.metetrialForm.meterialGroup.ruleNo+this.water;
            return this.metetrialForm.meterialNo
        }
    }
}
</script>
<style scoped>
div.el-breadcrumb {
    height: 30px;
}
</style>