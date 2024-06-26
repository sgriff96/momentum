<script lang="ts">
	import { buttonVariants } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { type HabitFormSchema, habitFormSchema } from './schema';
	import { type Infer, type SuperValidated, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { Textarea } from '$lib/components/ui/textarea';
	import { FilePenLine, Settings, Trash2 } from 'lucide-svelte';
	import type { IHabit } from '$lib/types/Habit';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import Button from '$lib/components/ui/button/button.svelte';

	export let data: SuperValidated<Infer<HabitFormSchema>>;
	export let habit: IHabit;
	let open = false;
	let deleteOpen = false;

	const onSubmit = () => {
		if (data.valid) {
			// TODO: for some reason getting back a new data object with empty properties and valid === false so its never closing modal
			open = false;
		}
	};

	const form = superForm(data, {
		validators: zodClient(habitFormSchema),
	});

	const { form: formData, enhance } = form;

	formData.set({
		habitName: habit.name,
		habitDescription: habit.description || undefined,
	});

	const onDelete = () => (deleteOpen = false);
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger class={buttonVariants({ variant: 'outline', size: 'sm' })}>
		<Settings class="mr-1 h-4 w-4" />Settings
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		<DropdownMenu.Group>
			<DropdownMenu.Label>Habit</DropdownMenu.Label>
			<DropdownMenu.Separator />
			<DropdownMenu.Item on:click={() => (open = true)}>
				<FilePenLine class="mr-2 h-4 w-4" />
				<span>Edit</span>
			</DropdownMenu.Item>
			<DropdownMenu.Item on:click={() => (deleteOpen = true)}>
				<Trash2 class="mr-2 h-4 w-4 text-destructive hover:text-destructive" />
				<span class="text-destructive hover:text-destructive">Delete</span>
			</DropdownMenu.Item>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>

<Dialog.Root
	bind:open={open}
	onOutsideClick={() => {
		open = false;
	}}>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Edit Habit</Dialog.Title>
			<form method="POST" action="?/edit" use:enhance>
				<Form.Field form={form} name="habitName">
					<Form.Control let:attrs>
						<Form.Label>Habit Name</Form.Label>
						<Input {...attrs} bind:value={$formData.habitName} />
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field form={form} name="habitDescription">
					<Form.Control let:attrs>
						<Form.Label>Habit Description (optional)</Form.Label>
						<Textarea {...attrs} placeholder="A description of your habit" bind:value={$formData.habitDescription} />
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Button on:click={onSubmit}>Save</Form.Button>
			</form>
		</Dialog.Header>
	</Dialog.Content>
</Dialog.Root>

<Dialog.Root
	bind:open={deleteOpen}
	onOutsideClick={() => {
		deleteOpen = false;
	}}>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Delete Habit</Dialog.Title>
			<p class="py-2">Are you sure you want to delete this habit?</p>
			<Dialog.Footer>
				<form method="POST" action="?/delete" use:enhance>
					<Button variant="outline" on:click={() => (deleteOpen = false)}>Cancel</Button>
					<Form.Button variant="destructive" on:click={onDelete}>Delete</Form.Button>
				</form>
			</Dialog.Footer>
		</Dialog.Header>
	</Dialog.Content>
</Dialog.Root>
