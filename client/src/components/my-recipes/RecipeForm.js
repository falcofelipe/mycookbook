import React, { useState, useEffect, useMemo, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	useRecipes,
	addRecipe,
	clearCurrent,
	updateRecipe,
} from '../../context/my-recipes/RecipesState';
import { useAlert, setAlert } from '../../context/alert/AlertState';
import { uploadImage } from '../../utils/uploadImage';
import { validateRecipeForm } from '../../utils/validateRecipeForm';

import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const RecipeForm = (props) => {
	const [recipesState, recipesDispatch] = useRecipes();
	const alertDispatch = useAlert()[1];

	const { current } = recipesState;
	const navigate = useNavigate();

	const defaultImgUrl =
		'https://res.cloudinary.com/falco-felipe27/image/upload/v1613706890/chefHat_qxxwbb.png';

	// useMemo is used to prevent rerendering initialState on every render
	const initialState = useMemo(
		() => ({
			title: '',
			imageUrl: defaultImgUrl,
			icons: [],
			servings: 0,
			readyInMinutes: 0,
			healthScore: 0,
			dishTypes: '',
			cuisines: '',
			diets: '',
			ingredients: [],
			ingredientItem: '',
			instructions: [],
			instructionStep: '',
			fromSpoon: false,
			spoonId: null,
		}),
		[]
	);

	const setUploading = useState(false)[1];
	const [recipe, setRecipe] = useState(initialState);

	useEffect(() => {
		if (current !== null) {
			setRecipe({
				...current,
				dishTypes: current.dishTypes.join(', '),
				cuisines: current.cuisines.join(', '),
				diets: current.diets.join(', '),
			});
		} else if (props.state && props.state.spoonRecipe) {
			setRecipe({
				...props.state.spoonRecipe,
				dishTypes: props.state.spoonRecipe.dishTypes.join(', '),
				cuisines: props.state.spoonRecipe.cuisines.join(', '),
				diets: props.state.spoonRecipe.diets.join(', '),
			});
		} else {
			setRecipe(initialState);
		}
	}, [current, props.state, initialState]);

	const {
		title,
		imageUrl,
		servings,
		readyInMinutes,
		healthScore,
		dishTypes,
		cuisines,
		diets,
		ingredients,
		ingredientItem,
		instructions,
		instructionStep,
	} = recipe;

	const onChange = (e) => {
		setRecipe({
			...recipe,
			[e.target.name]: e.target.value,
		});
	};

	const toggleEdit = (e) => {
		if (e.target.tagName === 'I') {
			e.target.parentElement.parentElement.nextElementSibling.classList.toggle(
				'd-none'
			);
		} else {
			e.target.parentElement.nextElementSibling.classList.toggle(
				'd-none'
			);
		}
		e.target.parentElement.parentElement.classList.toggle('d-none');
	};

	const toggleImgEdit = (e) => {
		e.target.nextElementSibling.classList.toggle('d-none');
		e.target.classList.toggle('d-none');
	};

	const toggleShow = (e) => {
		e.target.previousElementSibling.classList.toggle('d-none');
		e.target.classList.toggle('d-none');
	};

	const onFileUpload = (e) => {
		const files = Array.from(e.target.files);
		setUploading(true);

		const formData = new FormData();
		files.forEach((file, i) => formData.append(i, file));

		uploadImage(formData).then((img) => {
			setUploading(false);
			setRecipe({
				...recipe,
				imageUrl: img.url,
			});
			toggleShow(e);
		});
	};

	const onAddIngredient = (e) => {
		setRecipe({
			...recipe,
			ingredients: [...ingredients, ingredientItem],
			ingredientItem: '',
		});
	};

	const onDeleteIngredient = (e) => {
		ingredients.splice(parseInt(e.target.parentElement.name), 1);
	};

	const onAddInstruction = (e) => {
		setRecipe({
			...recipe,
			instructions: [...instructions, instructionStep],
			instructionStep: '',
		});
	};

	const onDeleteInstruction = (e) => {
		instructions.splice(parseInt(e.target.parentElement.name), 1);
	};

	const prepareRecipeToSend = (recipeRaw) => {
		recipeRaw.dishTypes = dishTypes !== '' ? dishTypes.split(',') : [];
		recipeRaw.cuisines = cuisines !== '' ? cuisines.split(',') : [];
		recipeRaw.diets = diets !== '' ? diets.split(',') : [];
		delete recipeRaw.ingredientItem;
		delete recipeRaw.instructionItem;
		return recipeRaw;
	};

	const onSubmit = (e) => {
		e.preventDefault();

		const recipePrepared = prepareRecipeToSend({ ...recipe });
		if (!validateRecipeForm(recipe)) {
			setAlert(
				alertDispatch,
				'Some or all of the following required fields are not filled: Title, Servings, Ready In Ingredients',
				'danger'
			);
			document.body.scrollTop = 0;
			document.documentElement.scrollTop = 0;
			return null;
		}
		if (current === null) {
			addRecipe(recipesDispatch, recipePrepared);
		} else {
			updateRecipe(recipesDispatch, recipePrepared);
		}
		clearAll();
		navigate('/recipes');
	};

	const preventEnterSubmit = (e) => e.key === 'Enter' && e.preventDefault();

	const clearAll = () => {
		clearCurrent(recipesDispatch);
	};

	return (
		<Fragment>
			<h1 className='text-light text-center mt-4'>
				{current === null ? 'Add Recipe' : 'Edit Recipe'}
			</h1>
			<Card className='bg-light px-3 mt-2'>
				<Form
					id='recipe-form'
					onSubmit={onSubmit}
					onKeyDown={preventEnterSubmit}>
					<Row>
						<Col
							id='recipe-form-details'
							className='recipe-details text-center bg-primary text-light py-3 primary-inputs'
							xs={12}
							md={5}
							xl={4}>
							<Row>
								<Col className='recipe-img'>
									<img
										src={imageUrl}
										alt={`${title}`}
										style={{ maxWidth: '100%' }}
									/>
									<Form.Group>
										<Button
											variant='dark'
											name='image'
											onClick={toggleImgEdit}
											className='mt-1'>
											{imageUrl !== defaultImgUrl
												? 'Update the image'
												: 'Upload an image'}
										</Button>
										<Form.Control
											type='file'
											name='image'
											onChange={onFileUpload}
											className='d-none'
										/>
									</Form.Group>
								</Col>
							</Row>
							<Row>
								<Col xs={12} sm={7} md={12}>
									<div className='recipe-main mb-2'>
										<div className='recipe-title'>
											<h3 name='title mt-1 text-light'>
												{title || 'Insert Title'}
												<a
													href='#!'
													onClick={toggleEdit}
													className='ml-2 edit-icon'>
													<i className='fas fa-pencil-alt text-dark' />
												</a>
											</h3>
											<Form.Control
												type='text'
												placeholder='Recipe Title'
												name='title'
												value={title}
												onChange={onChange}
												onBlur={toggleShow}
												className='discrete-input d-none'
												required
											/>
										</div>
									</div>
									<hr className='border-light w-75' />
									<div className='recipe-stats-form text-center mb-3'>
										<div className='servings'>
											<strong className='d-inline'>
												Servings:{' '}
											</strong>
											<span>
												{servings}
												<a
													href='#!'
													onClick={toggleEdit}
													className='ml-2 edit-icon'>
													<i className='fas fa-pencil-alt text-dark' />
												</a>
											</span>
											<Form.Control
												type='number'
												placeholder='Servings'
												name='servings'
												value={servings}
												onChange={onChange}
												onBlur={toggleShow}
												className='discrete-input d-none'
												required
											/>
										</div>
										<div className='ready-in'>
											<strong className='d-inline'>
												Ready In:{' '}
											</strong>
											<span>
												{readyInMinutes}min
												<a
													href='#!'
													onClick={toggleEdit}
													className='ml-2 edit-icon'>
													<i className='fas fa-pencil-alt text-dark' />
												</a>
											</span>
											<Form.Control
												type='number'
												placeholder='Ready in... (minutes)'
												name='readyInMinutes'
												value={readyInMinutes}
												onChange={onChange}
												onBlur={toggleShow}
												className='discrete-input d-none'
												required
											/>
										</div>
										<div className='healthScore'>
											<strong className='d-inline'>
												Health Score:{' '}
											</strong>
											<span>
												{healthScore}
												<a
													href='#!'
													onClick={toggleEdit}
													className='ml-2 edit-icon'>
													<i className='fas fa-pencil-alt text-dark' />
												</a>
											</span>
											<Form.Control
												type='number'
												placeholder='Health Score (roughly)'
												name='healthScore'
												value={healthScore}
												onChange={onChange}
												onBlur={toggleShow}
												className='discrete-input d-none'
											/>
										</div>
									</div>
								</Col>
								<Col
									xs={12}
									sm={5}
									md={12}
									className='d-flex flex-column justify-content-middle'>
									<div className='recipe-secondary-form text-center mx-2'>
										<div className='dish-types'>
											<strong>Dish Types: </strong>
											<span>
												{dishTypes || 'Not Specified'}
												<a
													href='#!'
													onClick={toggleEdit}
													className='ml-2 edit-icon'>
													<i className='fas fa-pencil-alt text-dark' />
												</a>
											</span>
											<Form.Control
												type='text'
												placeholder='Dish Type(s)'
												name='dishTypes'
												value={dishTypes}
												onChange={onChange}
												onBlur={toggleShow}
												className='discrete-input d-none'
											/>
										</div>
										<div className='cuisine'>
											<strong>Cuisines: </strong>
											<span>
												{cuisines || 'Generic'}
												<a
													href='#!'
													onClick={toggleEdit}
													className='ml-2 edit-icon'>
													<i className='fas fa-pencil-alt text-dark' />
												</a>
											</span>
											<Form.Control
												type='text'
												placeholder='Cuisine(s)'
												name='cuisines'
												value={cuisines}
												onChange={onChange}
												onBlur={toggleShow}
												className='discrete-input d-none'
											/>
										</div>
										<div className='diets'>
											<strong>Diets: </strong>
											<span>
												{diets || 'None'}
												<a
													href='#!'
													onClick={toggleEdit}
													className='ml-2 edit-icon'>
													<i className='fas fa-pencil-alt text-dark' />
												</a>
											</span>
											<Form.Control
												type='text'
												placeholder='Diet(s)'
												name='diets'
												value={diets}
												onChange={onChange}
												onBlur={toggleShow}
												className='discrete-input d-none'
											/>
										</div>
									</div>
								</Col>
							</Row>
						</Col>

						<Col
							id='recipe-how-to'
							className='recipe-how-to py-3 pl-4'>
							<div className='recipe-howto-form'>
								<h4 className='text-primary recipe-header'>
									Ingredients
								</h4>
								<ul className='mt-2'>
									{ingredients.length > 0
										? ingredients.map((ingredient, idx) => (
												<li key={idx}>
													<span>{ingredient}</span>
													<span className='action-icons'>
														<a
															href='#!'
															name={idx}
															onClick={
																onDeleteIngredient
															}
															className='edit-icon pull-right'>
															<i className='fas fa-times text-dark' />
														</a>{' '}
													</span>
												</li>
										  ))
										: null}
									<li>
										<Form.Group as={Row}>
											<Col
												xs={10}
												sm={9}
												className='pr-0'>
												<Form.Control
													type='text'
													placeholder='Ingredient'
													name='ingredientItem'
													value={ingredientItem}
													onChange={onChange}
												/>
											</Col>
											<Col xs={2} sm={3} className='p-0'>
												<Button
													onClick={onAddIngredient}>
													<i className='fas fa-plus' />
													<span className='d-none d-sm-inline ml-1'>
														Add
													</span>
												</Button>
											</Col>
										</Form.Group>
									</li>
								</ul>
							</div>
							<div className='recipe-howto-form'>
								<h4 className='text-primary recipe-header'>
									Instructions
								</h4>
								<ol className='mt-2'>
									{instructions.length > 0
										? instructions.map(
												(instruction, idx) => (
													<li key={idx}>
														<span>
															{instruction}
														</span>
														<span className='action-icons'>
															<a
																href='#!'
																name={idx}
																onClick={
																	onDeleteInstruction
																}
																className='edit-icon'>
																<i className='fas fa-times text-dark' />
															</a>{' '}
														</span>
													</li>
												)
										  )
										: null}
									<li>
										<Form.Group as={Row}>
											<Col
												xs={10}
												sm={9}
												className='pr-0'>
												<Form.Control
													as='textarea'
													rows={2}
													placeholder='Instruction'
													name='instructionStep'
													value={instructionStep}
													onChange={onChange}
												/>
											</Col>
											<Col xs={2} sm={3} className='p-0'>
												<Button
													onClick={onAddInstruction}>
													<i className='fas fa-plus' />
													<span className='d-none d-sm-inline ml-1'>
														Add
													</span>
												</Button>
											</Col>
										</Form.Group>
									</li>
								</ol>
							</div>
						</Col>
					</Row>
				</Form>
			</Card>
			<Button
				type='submit'
				form='recipe-form'
				var='primary'
				onClick={onSubmit}
				className='btn-block w-75 mx-auto my-2 font-lg'>
				{current === null ? 'Add Recipe' : 'Update Recipe'}
			</Button>
			<br />
		</Fragment>
	);
};

export default RecipeForm;
