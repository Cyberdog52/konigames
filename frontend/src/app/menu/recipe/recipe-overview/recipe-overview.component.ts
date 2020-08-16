import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {RecipeService} from "../recipe.service";
import {Recipe} from "../../../shared/model/menu-dtos";

@Component({
  selector: 'app-recipe-overview',
  templateUrl: './recipe-overview.component.html',
  styleUrls: ['./recipe-overview.component.scss']
})
export class RecipeOverviewComponent implements OnInit {

  recipe: Recipe;
  id: number;

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService) { }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');

    this.loadRecipe();
  }

  private loadRecipe() {
    this.recipeService.loadRecipe(this.id).subscribe(loadedRecipe => {
      this.recipe = loadedRecipe;
    })
  }

  save() {
    this.recipeService.save(this.recipe).subscribe(savedRecipe => {
      this.recipe = savedRecipe;
    })
  }

  addNewStep() {
    this.recipe.steps.push("Neuer Arbeitsschritt " + this.recipe.steps.length);
  }

  removeStep(id: number) {
    this.recipe.steps.splice(id, 1);
  }


  changeStep(id, event) {
    this.recipe.steps[id] = event.target.value;
  }

  moveStepUp(id: number) {
    if (id == 0) {
      return;
    }
    const temp = this.recipe.steps[id];
    this.recipe.steps[id] = this.recipe.steps[id-1];
    this.recipe.steps[id-1] = temp;
  }
  moveStepDown(id: number) {
    if (id >= this.recipe.steps.length -1) {
      return;
    }
    const temp = this.recipe.steps[id];
    this.recipe.steps[id] = this.recipe.steps[id+1];
    this.recipe.steps[id+1] = temp;
  }


}