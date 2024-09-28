<template>
    <div>
    <div class="card">
        <div>
            <h1 v-if="!ability.can('menu','comercial')">{{ $t('menu.instructor.page_title') }}</h1>
        </div>


    </div>
    <div class="card">
        <div class="grid">
            <div class="col-xs-12 col-sm-6 col-md-4 mb-2 text-center mx-auto">
                <!--Uncomment when table is done-->
                
                <div class="col-xs-12 col-sm-6 col-md-4 mb-2 text-center mx-auto">
            <Toolbar style="margin-bottom: 1rem">
                <template #center>
                    <Button :disabled="listRowSelect.length > 0" label="New" icon="pi pi-plus" class="p-button-success mb-2 mt-2" @click="openDialog('new')" size="large" />
                    <Divider layout="vertical" />
                    <Button :disabled="!(listRowSelect.length > 0 && listRowSelect.length < 2)" label="Edit" icon="pi pi-file-edit" class="p-button-help mb-2 mt-2" @click="openDialog('edit')" size="large" />
                    <Divider layout="vertical" />
                    <Button :disabled="!(listRowSelect.length > 0 && listRowSelect.length < 2)" label="Clone" icon="pi pi-copy" class="p-button-secondary mb-2 mt-2" @click="openDialog('clone')" size="large" />
                    <Divider layout="vertical" />
                    <Button :disabled="listRowSelect.length > 0" label="Export" icon="pi pi-file-import" class="p-button-warning mb-2 mt-2" @click="openExport" size="large" />
                    <Divider layout="vertical" />
                    <Button :disabled="!listRowSelect.length > 0" label="Delete" icon="pi pi-trash" class="p-button-danger mb-2 mt-2" @click="openDelete" size="large" />
                </template>
            </Toolbar>
            </div>

            </div>
        </div>
        <!-- <pre>{{ dataResponseAPI }}</pre> -->
        <DataTable
        :value="dataFromComponent"
        dataKey="uuid"
        tableStyle="min-width: 75rem"
        showGridlines
        :loading="loading"
        scrollable
        scrollHeight="600px"
        resizableColumns
        columnResizeMode="expand"
        sortMode="multiple"
        :paginator="true"
        :rows="50"
        :rowsPerPageOptions="[5, 10, 20, 50]"
        :class="`p-datatable-${size?.class || 'default-size'}`" 
        @row-select="onRowSelect(listRowSelect)"
        @row-unselect="onRowSelect(listRowSelect)"
        @select-all-change="onSelectAllChange"
        v-model:selection="listRowSelect"
        filterDisplay="menu"
        v-model:filters="filters"
        :globalFilterFields="['name', 'company.name', 'farm.name', 'status.name', 'created_at', 'updated_at']" 
        >
        <template #header>
            <!--Uncomment when filters are done-->

            <Toolbar class = "mb-2">
                    <template v-slot:start>
                        <Button type="button" icon="pi pi-filter-slash" label="Limpiar" class="p-button-outlined mb-2" @click="clearFilter()" />
                    </template>
                    <template v-slot:end>
                        <span class="p-input-icon-left mb-2">
                        <i class="pi pi-search" />
                        <InputText v-model="filters['global'].value" placeholder="Buscar" style="width: 100%" />
                    </span>
                    </template>
                    <template v-slot:center>
                        
                        <SelectButton v-model="size" :options="sizeOptions" optionLabel="label" dataKey="label"> </SelectButton>
                        
                    </template>       
                </Toolbar>
        </template>

        <template #empty> No customers found. </template>
        <template #loading> Loading customers data. Please wait. </template>
        <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
        <Column field="code" filterField="code" header="Code" sortable :frozen="documentFrozen"> <!--Replace :frozen with the model-->
            <template #header>
                    <ToggleButton v-model="documentFrozen" onIcon="pi pi-lock" offIcon="pi pi-lock-open" onLabel="" offLabel="" />
                </template>
                <template #body="{ data }">
                    {{ data.code }} 
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" class="p-column-filter" :placeholder="$t('general.search')"  />
                </template>
        </Column>

        <Column field="name" filterField="name" header="Name" sortable> 
            
                <template #body="{ data }">
                    {{ data.name }} 
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" class="p-column-filter" :placeholder="$t('general.search')" />
                </template>
        </Column>

        <!--Here add other columns-->

        <Column field="farmName" filterField="farm.name" header="Farm Name" sortable>
                <template #body="{ data }">
                    {{ data.farm.name }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" class="p-column-filter" :placeholder="$t('general.search')" />
                </template>
            </Column>

            <Column field="companyName" filterField="company.name" header="Company Name" sortable>
                <template #body="{ data }">
                    {{ data.company.name }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" class="p-column-filter" :placeholder="$t('general.search')" />
                </template>
            </Column>

            <Column field="createdAt" filterField="created_at" header="Creation date" sortable>
                <template #body="{ data }">
                    {{ data.created_at }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" class="p-column-filter" :placeholder="$t('general.search')" />
                </template>
            </Column>

            <Column field="updatedAt" filterField="updated_at" header="Modification date" sortable>
                <template #body="{ data }">
                    {{ data.updated_at }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" class="p-column-filter" :placeholder="$t('general.search')" />
                </template>
            </Column>

            <Column field="status" filterField="status.name" header="Status" sortable>
                <template #body="{ data }">
                    <Tag :value="data.status.name" :severity="'EFC88B'" />
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" class="p-column-filter" :placeholder="$t('general.search')" />
                </template>
            </Column>

        </DataTable>
        <Dialog v-model:visible="formDialog" modal :header="formDialogTitle" class="p-fluid text-center mx-auto">

                                    <div class="grid">
                                        <div class="mb-3 col-12 md:col-6 lg:col-6">
                                            <div class="flex align-items-center">
                                            <label for="username" class="font-semibold w-6rem">Name :</label>
                                            <InputText id="username" v-model="name" class="flex-auto" autocomplete="off" v-bind="nameProps" />
                                        </div>
                                        <FrontEndErrors :errorsNew="errorsNew" name="name" />
                                        <BackendErrors :name="errorResponseAPI?.errors?.code" />
                                    </div>

                                    <div class="mb-3 col-12 md:col-6 lg:col-6">
                                        <div class="flex align-items-center">
                                            <label for="username" class="font-semibold w-6rem">Code :</label>
                                            <InputText id="username" v-model="codeV" class="flex-auto" autocomplete="off" v-bind="codeVProps" />
                                        </div>
                                        <FrontEndErrors :errorsNew="errorsNew" name="codeV" />
                                        <BackendErrors :name="errorResponseAPI?.errors?.code" />
                                    </div>

                                    <div class="mb-3 col-12 md:col-6 lg:col-6">
                                        <div class="flex align-items-center">
                                            <label for="farm" class="font-semibold w-6rem">Farm :</label>
                                            <AutoComplete v-model="farm" class="flex-auto" inputId="ac" :suggestions="farms" @complete="searchFarms" field="name" dropdown />
                                        </div>
                                        <FrontEndErrors :errorsNew="errorsNew" name="farm" />
                                        <BackendErrors :name="errorResponseAPI?.errors?.farm_uuid" />
                                    </div>

                                    <div class="mb-3 col-12 md:col-6 lg:col-6">
                                        <div class="flex align-items-center">
                                            <label for="company" class="font-semibold w-6rem">Company:</label>
                                            <AutoComplete v-model="company" class="flex-auto" inputId="ac" :suggestions="compa" @complete="searchCompannies" field="name" dropdown />
                                        </div>
                                        <FrontEndErrors :errorsNew="errorsNew" name="company" />
                                        <BackendErrors :name="errorResponseAPI?.errors?.company_uuid" />
                                    </div>
                                </div>

                <div class="flex justify-content-end gap-2">
                    <Button type="button" label="Cancel" severity="secondary" @click="formDialog = false" />
                    <Button type="button" label="Save" @click="actionRecordManager(state)" />
                </div>
            </Dialog>

            <Dialog v-model:visible="formDialogExport" :style="{ width: '290px' }" :header="formDialogExportTitle" :modal="true" class="p-fluid">
                <div class="mb-3">
                    <div class="flex align-items-center gap-3 mb-1">
                        <label for="username" class="font-semibold w-6rem">Filename:</label>
                        <InputText id="username" v-model="filename" class="flex-auto" autocomplete="off" v-bind="nameProps" :required="true" />
                    </div>
                </div>
                <div class="flex align-items-center gap-3">
                    <div class="align-items-center gap-3">
                        <label for="username" class="font-semibold">Format:</label>
                        <Dropdown v-model="format" :options="extenciones" optionLabel="name" :class="' w-full'" />
                    </div>
                    <div class="align-items-center gap-3">
                        <label for="username" class="font-semibold">Export:</label>
                        <Dropdown v-model="exportAll" :options="optionsEsport" optionLabel="name" :class="' w-full md:w-10rem'" />
                    </div>
                </div>

                <template #footer>
                    <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="formDialogExport = false" />
                    <Button label="Export" icon="pi pi-check" class="p-button-text" @click="ExportRecord" />
                </template>
            </Dialog>

            <Dialog v-model:visible="formDialogDelete" :style="{ width: '450px' }" :header="formDialogDeleteTitle" :modal="true">
                <label for="username" class="text-2xl font-medium w-6rem"> Are you sure you want to delete the selected ones? </label>
                <div class="card flex flex-wrap mt-2 gap-2">
                    <div v-for="item in listRowSelect" :key="item.id">
                        <Chip :label="item.name" removable @remove="remove(item)" icon="pi pi-ban" />
                    </div>
                </div>
                <div class="flex justify-content-end gap-2">
                    <Button type="button" label="Cancel" severity="secondary" @click="formDialogDelete = false" />
                    <Button type="button" label="Delete" @click="DeleteRecord" />
                </div>
            </Dialog>

            <Toast />
    </div>
</div>
    
</template>

<!-- 
filterDisplay="menu"
v-model:filters="filters"
:globalFilterFields="['', 'company.name']"


const documentFrozen = ref(false); change name field 
<DataTable id="tblData"
     -->
<script setup>
import BackendErrors from '@/layout/composables/Errors/BackendErrors.vue';
import FrontEndErrors from '@/layout/composables/Errors/FrontendErrors.vue';
import ability from '@/service/ability.js';
import { CrudService } from '@/service/CRUD/CrudService';
import useData from '@/service/FetchData/FetchDataAPI.js';
import { InitialDataService } from '@/service/initialData';
import { FilterMatchMode, FilterOperator } from '@primevue/core/api';
import { toTypedSchema } from '@vee-validate/zod';
// import { saveAs } from 'file-saver/dist/FileSaver';
import { useToast } from 'primevue/usetoast';
import { useForm } from 'vee-validate';
import { onBeforeMount, onMounted, provide, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import * as XLSX from 'xlsx';
import { z } from 'zod';
const { t } = useI18n();
const { getRequest, postRequest, putRequest, deleteRequest,errorResponseAPI } = useData();

const prueba = ref({revisar: 'revisar GET-POST-PUT-DELETE'});
let endpoint = ref('/variants');  //replace endpoint with your endpoint
const crudService = CrudService(endpoint.value);
const dataFromComponent = ref();
const Farms = ref([]);
const farms = ref([]);
const Compan = ref([]);
const compa = ref([]);
const farmDefault = sessionStorage.getItem('accessSessionFarm');
const companyDefault = sessionStorage.getItem('accessSessionCompany');
const formDialogExportTitle = 'Export xxxxxxxxxx';
const formDialogDeleteTitle = 'Delete xxxxxxxxxx';
const formDialogExport = ref(false);
const formDialogDelete = ref(false);
const toast = useToast();
const filename = ref('table');
const isChanging = ref(false);




let size = ref()
let sizeOptions = ref()

onMounted(() => {

});

onBeforeMount(() => {
   
    readAll();
    initFilters();

});
const listRowSelect = ref([]);
const loading = ref(false);
const RowSelect = (data) => {
    listRowSelect.value = data;
};
watch(listRowSelect, RowSelect);
const onRowSelect = (data) => {
    listRowSelect.value = data;
    //assignValues(mode.value)
};

watch(listRowSelect, onRowSelect);

const onSelectAllChange = () => {
    onRowSelect();
};
const filters = ref();

const clearFilter = () => {
    initFilters();
};
const initFilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        code: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'status.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'farm.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'company.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        created_at: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        updated_at: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] }
    };
};

const documentFrozen = ref(false);
const readAll = async () => {
    loadingData();
    
    InitialDataService.getSize().then((data) => {size.value = data;});
    InitialDataService.getSizeOptions().then((data) => {sizeOptions.value = data; });

    const respFarms = await InitialDataService.getBranches();
    if (!respFarms.ok) toast.add({ severity: 'error', detail: 'Error' + respFarms.error, life: 3000 });
    Farms.value = respFarms.data.data.map((farm) => ({ id: farm.uuid, name: farm.name }));

    const respCompan = await InitialDataService.getCompanies();
    if (!respCompan.ok) toast.add({ severity: 'error', detail: 'Error' + respCompan.error, life: 3000 });
    Compan.value = respCompan.data.data.map((comp) => ({ id: comp.uuid, name: comp.name }));

};
const loadingData = async () => {
    //const response = await getRequest(endpoint.value);
    const response = await crudService.getAll();
    if (!response.ok) toast.add({ severity: 'error', detail: 'Error' + response.error, life: 3000 });
    dataFromComponent.value = response.data.data;
};
watch(
    () => dataFromComponent.value,
    (newValue, oldValue) => {}
);
watch(
    () => isChanging.value,
    (newValue, oldValue) => {
        readAll(endpoint.value);
    }
);
const {
    handleSubmit: handleSubmitNew,
    errors: errorsNew,
    defineField,
    resetForm
} = useForm({initialValues: { name: '', codeV: '',farm:{ id: '', name: '' }, company:{ id: '', name: '' }},
    validationSchema: toTypedSchema(
        z.object({
            name: z.string().min(4),
            codeV: z.string().min(4),
            farm: z
                .object({
                    name: z.string().min(4),
                    id: z.string().min(4)
                })
                .optional(),
            company: z
                .object({
                    name: z.string().min(4),
                    id: z.string().min(4)
                })
                .optional()
        })
    )
});
const [name, nameProps] = defineField('name');
const [codeV, codeVProps] = defineField('codeV');
const [farm] = defineField('farm');
const [company] = defineField('company');

const extenciones = ref([{ name: 'CSV' }, { name: 'XLS' }]);
const optionsEsport = ref([{ name: 'ALL' }, { name: 'SELECTED' }]);
const format = ref({ name: 'CSV' });
const exportAll = ref({ name: 'ALL' });
const selectedRegisters = ref([]);

let headerNames = ref([]);
provide('isChanging', isChanging);


const formDialogTitle = ref('');
const formDialog = ref(false);

const state = ref('');


const openDialog = (mode) => {
    console.log(mode)
    if (mode=='new')
        {
            console.log('entre')
            formDialogTitle.value = 'Create new register';        
            resetForm();
        }
    else
    {
        if(mode=='edit') formDialogTitle.value = 'Edit new register';
        else if(mode=='clone') formDialogTitle.value = 'Clone new register'

        if (listRowSelect.value.length < 1) {
            console.log(listRowSelect.value)
            toast.add({ severity: 'error', summary: 'Error', detail: 'Select a record', life: 3000 });
            //return
        }
        else{
            const { code, company: empresa, farm: farmParameter, name: nombre } = listRowSelect.value[0];
            name.value = nombre;
            codeV.value = code;
            company.value = { id: empresa.uuid, name: empresa.name };
            farm.value = { id: farmParameter.uuid, name: farmParameter.name };
        }

    }
    formDialog.value = true;
    state.value = mode;
};

const openExport = () => {
    format.value = { name: 'CSV' };
    formDialogExport.value = true;
};

const openDelete = () => {
    formDialogDelete.value = true;
};

const actionRecordManager = handleSubmitNew(async (values) => {
    if (state.value === 'new') {
        await createRecord(values);
    } else if (state.value === 'edit') {
        await EditRecord(values);
    } else if (state.value === 'clone') {
        await CloneRecord(values);
    }
});


const createRecord = handleSubmitNew(async (values) => {
    const data = {
        code: values.codeV,
        name: values.name,
        company_uuid: values.company ? values.company.id : companyDefault,
        farm_uuid: values.farm ? values.farm.id : farmDefault
    };

    //const restp = await postRequest(endpoint.value, data);
    const restp = await crudService.create(data);

    toast.add({ severity: restp.ok ? 'success' : 'error', summary: 'Create', detail: restp.ok ? 'Creado' : restp.error, life: 3000 });
    loadingData();
    formDialog.value = false;
});


const EditRecord = handleSubmitNew(async (values) => {
    const { uuid } = listRowSelect.value[0];
    const data = {
        code: values.codeV,
        name: values.name,
        company_uuid: values.company ? values.company.id : companyDefault,
        farm_uuid: values.farm ? values.farm.id : farmDefault
    };
    
    //const restp = await putRequest(endpoint.value, data, uuid);
    const restp = await crudService.update(uuid, data);
    toast.add({ severity: restp.ok ? 'success' : 'error', summary: 'Edit', detail: restp.ok ? 'Editado' : restp.error, life: 3000 });
    loadingData();
    
    if (restp.ok) {
        formDialog.value = false;
        listRowSelect.value = [];
        selectedRegisters.value = [];
    }
});

const CloneRecord = handleSubmitNew(async (values) => {
    const data = {
        code: values.codeV,
        name: values.name,
        company_uuid: values.company ? values.company.id : companyDefault,
        farm_uuid: values.farm ? values.farm.id : farmDefault
    };
    //const restp = await postRequest(endpoint.value, data);
    const restp = await crudService.create(data);
    toast.add({ severity: restp.ok ? 'success' : 'error', summary: 'Clone', detail: restp.ok ? 'Clonado' : restp.error, life: 3000 });
    loadingData();
    if (restp.ok) {
        formDialog.value = false;
        listRowSelect.value = [];
        selectedRegisters.value = [];
    }

});

const DeleteRecord = async () => {
    formDialogDelete.value = false;

    try {
        const deletePromises = [];
        listRowSelect.value.forEach(async (item) => {
            //const deletePromise = await deleteRequest(endpoint.value, item.uuid);
            const deletePromise = await crudService.delete(item.uuid);
            
            deletePromises.push(deletePromise);
        });
        await Promise.all(deletePromises);
        loadingData();
        toast.add({ severity: 'success', summary: 'Deleted Record', detail: 'Deleted', life: 3000 });
    } catch (error) {
        console.error('Error deleting:', error);
        toast.add({ severity: 'error', summary: 'Error', detail: 'Error deleting', life: 3000 });
    } finally {
        listRowSelect.value = [];
    }
};


const searchCompannies = (event) => {
    setTimeout(() => {
        if (!event.query.trim().length) {
            compa.value = [...Compan.value];
        } else {
            compa.value = Compan.value.filter((fram) => {
                return fram.name.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }
    }, 200);
};
const searchFarms = (event) => {
    setTimeout(() => {
        if (!event.query.trim().length) {
            farms.value = [...Farms.value];
        } else {
            farms.value = Farms.value.filter((fram) => {
                return fram.name.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }
    }, 200);
};


const ExportRecord = () => {
    const eventos = exportAll.value.name == 'ALL' ? dataFromComponent.value.map((data) => data) : listRowSelect.value.map((data) => data);
    formDialogExport.value = false;
    if (!eventos.length) return;
    if (format.value.name == 'CSV') formatCSV(eventos);
    else formatXLS(eventos);
};

function formatCSV(eventos) {
    const dataExport = [];
    dataExport.push(',' + Object.keys(eventos[0]) + '\n');
    dataExport.push(eventos.map((row) => Object.values(row) + '\n'));

    const blob = new Blob([dataExport.toString()], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename.value;
    link.click();
}

function formatXLS(eventos) {
    const data = eventos.map((row) => Object.values(row));
    const headers = Object.keys(eventos[0]);
    const prueba = [headers, ...data];
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(prueba, { headers });
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Reporte');
    const binaryData = XLSX.write(workbook, { type: 'array' });

    const file = new File([binaryData], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    // saveAs(file, filename.value + '.xlsx');
}


const remove = (aver) => {
    const index = listRowSelect.value.findIndex((x) => x.id === aver.id);
    if (index !== -1) {
        listRowSelect.value.splice(index, 1);
    }
};
</script>

<style lang="scss" scoped>
</style>