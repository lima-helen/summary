<template>
	<section>
		<div class="blank_20"></div>
		<el-radio-group v-model="content.colorStyle">
			<el-radio :label="index" v-for="(item,index) in colorStyles" :key="index">{{item}}</el-radio>
		</el-radio-group>
		<div class="blank_20"></div>
		<el-form :model="form" ref="form" label-width="100px">
			<el-form-item label="渐变中心" prop="location" v-if="content.colorStyle===1">
				<el-input v-model="form.location"></el-input>
				<small>center==50% 50%</small>
			</el-form-item>
			<el-form-item label="形状和大小" v-if="content.colorStyle===1">
				<el-radio-group v-model="content.sizeType">
					<el-radio :label="index" v-for="(item,index) in this.sizeTypes">{{item}}</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="渐变形状" prop="shape" v-if="content.colorStyle===1&&content.sizeType===0">
				<el-radio-group v-model="form.shape">
					<el-radio :label="item" v-for="(item,index) in colorShapes" :key="index"></el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="渐变大小" prop="size" v-if="content.colorStyle===1&&content.sizeType===1">
				<el-radio-group v-model="form.size">
					<el-radio :label="item" v-for="(item,index) in colorSizes" :key="index"></el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="渐变角度" prop="name" v-if="content.colorStyle===0">
				<el-input v-model="form.direction"></el-input>
			</el-form-item>
			<el-form-item label-width="0">
				<el-row :gutter="20">
					<el-col :span="6">
						<div class="color-picker">
							<el-color-picker v-model="colorStop" show-alpha size="mini"></el-color-picker>
						</div>
					</el-col>
					<el-col :span="6">
						<el-input v-model="percent" size="mini"></el-input>
					</el-col>
					<el-col :span="6">
						<el-button @click="addColor" size="mini" type="warning">添加颜色</el-button>
					</el-col>
					<el-col :span="6">

					</el-col>
				</el-row>
				<el-table :data="form.colorSteps" border fit highlight-current-row style="width: 100%"
				          v-if="form.colorSteps.length>0">
					<el-table-column label="起始颜色">
						<template slot-scope="scope">
							<el-input v-model="scope.row.colorStop" size="mini"></el-input>
						</template>
					</el-table-column>
					<el-table-column label="颜色占比" width="100">
						<template slot-scope="scope">
							<el-input v-model="scope.row.percent" size="mini"></el-input>
						</template>
					</el-table-column>
					<el-table-column align="center" label="操作" width="80">
						<template slot-scope="scope">
							<el-button type="danger" size="mini" @click="remove(scope.row.$index)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-form-item>
			<el-form-item>
				<el-button @click="resetForm" size="mini" type="primary">重置</el-button>
			</el-form-item>
		</el-form>
	</section>
</template>
<script>
	import base from '../base'

	export default {
		extends: base,
		contentDefault: {
			colorStyle: 0,
			sizeType: 0,
			list: {}
		},
		data() {
			return {
				colorStyles: ['线性渐变', '径向渐变'],
				colorSizes: ['closest-side', 'farthest-side', 'closest-corner', 'farthest-corn'],
				colorShapes: ['circle ', 'ellipse '],
				sizeTypes: ['形状', '大小'],
				colorStop: 'rgba(255, 69, 0, 0.68)',
				percent: '80%',
				form: {
					location: 'center',
					shape: '',
					size: '',
					direction: '0deg',
					colorSteps: []
				}
			}
		},
		mounted() {
			let {colorSteps} = this.content.list
			if (colorSteps && colorSteps.length > 0) {
				this.form = Object.assign({}, this.content.list)
			}
		},
		watch: {
			'content.colorStyle': function () {
				this.resetForm()
			},
			'form': {
				deep: true,
				handler(val) {
					this.content.list = Object.assign({}, this.form)
				}
			}
		},
		methods: {
			remove(index) {
				if (this.form.colorSteps.length > 0) {
					this.form.colorSteps.splice(index, 1)
				} else {
					this.$message.warning('已经是最后一个颜色啦，请添加颜色')
					return
				}
			},
			addColor() {
				let {colorStop, percent} = this
				this.form.colorSteps.push({colorStop, percent})
			},
			resetForm() {
				if (this.form.colorSteps.length > 0) {
					this.form.colorSteps.splice(0, this.form.colorSteps.length)
				}
			}
		}
	}
</script>
<style>
	.blank_20 {
		height: 20px;
	}
</style>
<style scoped>
	.color-picker {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		padding-top: 8px;
	}
</style>