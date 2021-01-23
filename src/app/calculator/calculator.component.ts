import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})

export class CalculatorComponent implements OnInit {
  matrixForm: FormGroup;
  matrixIndex = ["a11", "a12", "a13", "a21", "a22", "a23"];
  matrixSolution = {};

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.matrixForm = this.formBuilder.group({
      a11: 0,
      a12: 0,
      a13: 0,
      a21: 0,
      a22: 0,
      a23: 0,
    });
  }

  ngOnInit() {
  }

  onSubmit(matrixFormValue) {
    this.calculate(matrixFormValue);
  }

  calculate(matrixInts) {
    var determinante = (matrixInts.a11 * matrixInts.a22) - (matrixInts.a12 * matrixInts.a21);
    var dX = (matrixInts.a13 * matrixInts.a22) - (matrixInts.a12 * matrixInts.a23);
    var dY = (matrixInts.a11 * matrixInts.a23) - (matrixInts.a13 * matrixInts.a21);
    if (determinante == 0 && dX == 0 && dY == 0) {
      this.unableToSolveUnfinity();
    } else if (determinante == 0 && dX != 0 && dY != 0) {
      this.unableToSolveNoSolution();
    } else {
      this.wasAbleToSolve(dX / determinante, dY / determinante);
    }
  }

  wasAbleToSolve(x, y) {
    if (isNaN(x) && isNaN(y)) {
      this.error();
    } else {
      this.clearMap();
      this.matrixSolution['solved'] = true;
      this.matrixSolution['x'] = x;
      this.matrixSolution['y'] = y;
    }
  }

  unableToSolveNoSolution() {
    this.clearMap();
    this.matrixSolution['solved'] = false;
    this.matrixSolution['noSolution'] = "Keine Lösung!";
  }

  unableToSolveUnfinity() {
    this.clearMap();
    this.matrixSolution['solved'] = false;
    this.matrixSolution['noSolution'] = "Unendlich viele Lösungen!";
  }

  error() {
    this.clearMap();
    this.matrixSolution['solved'] = false;
    this.matrixSolution['noSolution'] = "Die Eingaben konnten nicht verarbeitet werden. Stellen Sie sicher, dass Sie nur ganzzahlige Werte eingetrage haben.";
  }

  clearMap() {
    this.matrixSolution = {};
  }

}
