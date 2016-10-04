import $ from 'jquery'
import Rx from 'rxjs/Rx'
import { getSubscriber } from './utils/getSubscriber'

const source$ = new Rx.Observable(observer => {
  observer.next('Some value')
  observer.next('Another different value')
  observer.next('Hello')
  observer.next('World')
  observer.complete()
})

const single$ = new Rx.Observable(observer => {
  observer.next('Single value...')
  observer.complete()
})

// Single - Retorna undefined se Observable retornar multiplos valores
single$
  .single()
  .subscribe(getSubscriber('Single'))

// First
source$
  .first()
  .subscribe(getSubscriber('First'))

// Last
source$
  .last()
  .subscribe(getSubscriber('Last'))

// Find - retorna undefined caso não encontre o valor
source$
  .find((value, index, obs) => {
    return value === 'Hello'
  })
  .subscribe(getSubscriber('Find'))

// FindIndex - retorna -1 caso não encontre o valor
source$
  .findIndex((value, index, obs) => {
    return value === 'Hello'
  })
  .subscribe(getSubscriber('FindIndex'))

// Take
source$
  .take(2)
  .subscribe(getSubscriber('Take'))

// TakeWhile
source$
  .takeWhile(i => i.length >= 6)
  .subscribe(getSubscriber('TakeWhile'))

// Skip
source$
  .skip(2)
  .subscribe(getSubscriber('Skip'))

// SkipWhile
source$
  .skipWhile(i => i.length >= 6)
  .subscribe(getSubscriber('SkipWhile'))

// TakeUntil e SkipUntil
Rx.Observable.interval(500)
  .takeUntil(Rx.Observable.timer(4000))
  .skipUntil(Rx.Observable.timer(2000))
  .subscribe(getSubscriber('TakeUntil e SkipUntil'))

// Filter
Rx.Observable.range(0, 10)
  .filter((x, i, obs) => {
    return x % 2 === 0
  })
  .subscribe(getSubscriber('Filter'))

// Distinct
Rx.Observable.of(11,11,20,20,53,21,11,35,98,45,33,33)
  .distinct()
  .subscribe(getSubscriber('Distinct'))

// DistinctUntilChanged
Rx.Observable.of(11,11,11,11,20,20,53,22,11,11,11,11,11,35,98,45,33,33)
  .distinctUntilChanged()
  .subscribe(getSubscriber('DistinctUntilChanged'))
